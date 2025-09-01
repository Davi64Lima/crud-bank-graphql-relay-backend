import mongoose from "mongoose";
import { Account, Transaction, TransactionStatus } from "../models";

export class TransferService {
  /**
   * Executa uma transferência entre duas contas usando transação do MongoDB
   * para garantir consistência dos dados
   */
  static async executeTransfer(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    description?: string
  ) {
    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(async () => {
        // Buscar as contas dentro da transação
        const [fromAccount, toAccount] = await Promise.all([
          Account.findById(fromAccountId).session(session),
          Account.findById(toAccountId).session(session),
        ]);

        if (!fromAccount) {
          throw new Error("Source account not found");
        }

        if (!toAccount) {
          throw new Error("Destination account not found");
        }

        // Validar se é possível fazer a transferência
        if (fromAccountId === toAccountId) {
          throw new Error("Source and destination accounts must be different");
        }

        if (amount <= 0) {
          throw new Error("Amount must be greater than zero");
        }

        if (!fromAccount.hasSufficientBalance(amount)) {
          throw new Error("Insufficient balance");
        }

        // Criar a transação como PENDING
        const transaction = new Transaction({
          from: fromAccountId,
          to: toAccountId,
          amount,
          description,
          status: TransactionStatus.PENDING,
        });

        await transaction.save({ session });

        // Executar a transferência
        fromAccount.debit(amount);
        toAccount.credit(amount);

        // Salvar as alterações nas contas
        await Promise.all([
          fromAccount.save({ session }),
          toAccount.save({ session }),
        ]);

        // Marcar transação como concluída
        transaction.status = TransactionStatus.COMPLETED;
        await transaction.save({ session });

        return transaction;
      });
    } catch (error) {
      // Em caso de erro, marcar a transação como falhada se ela foi criada
      // Note: isso é um exemplo simplificado, em produção seria mais complexo
      throw error;
    } finally {
      await session.endSession();
    }
  }

  /**
   * Busca o histórico de transações de uma conta
   */
  static async getAccountTransactions(
    accountId: string,
    limit: number = 20,
    offset: number = 0
  ) {
    return Transaction.find({
      $or: [{ from: accountId }, { to: accountId }],
    })
      .populate("from", "name")
      .populate("to", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);
  }

  /**
   * Calcula o saldo atual de uma conta baseado no saldo inicial + transações
   * (método alternativo para validação)
   */
  static async calculateAccountBalance(accountId: string): Promise<number> {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }

    const transactions = await Transaction.find({
      $or: [{ from: accountId }, { to: accountId }],
      status: TransactionStatus.COMPLETED,
    });

    let calculatedBalance = 0;

    transactions.forEach((transaction) => {
      if (transaction.from.toString() === accountId) {
        calculatedBalance -= transaction.amount; // Débito
      } else {
        calculatedBalance += transaction.amount; // Crédito
      }
    });

    return calculatedBalance;
  }
}
