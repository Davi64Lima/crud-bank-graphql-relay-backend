import mongoose, { Document, Schema, Types } from "mongoose";

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface ITransaction extends Document {
  id: string;
  from: Types.ObjectId;
  to: Types.ObjectId;
  amount: number;
  status: TransactionStatus;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01, // Valor mínimo de transação
    },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    collection: "transactions",
  }
);

// Índices para performance e consultas
TransactionSchema.index({ from: 1, createdAt: -1 });
TransactionSchema.index({ to: 1, createdAt: -1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ createdAt: -1 });

// Validação para garantir que from e to são diferentes
TransactionSchema.pre("save", function (next) {
  if (this.from.equals(this.to)) {
    next(new Error("Source and destination accounts must be different"));
  } else {
    next();
  }
});

// Método estático para criar uma transferência com validações
TransactionSchema.statics.createTransfer = async function (
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  description?: string
) {
  const Account = mongoose.model("Account");

  // Verificar se as contas existem
  const [fromAccount, toAccount] = await Promise.all([
    Account.findById(fromAccountId),
    Account.findById(toAccountId),
  ]);

  if (!fromAccount) {
    throw new Error("Source account not found");
  }

  if (!toAccount) {
    throw new Error("Destination account not found");
  }

  // Verificar saldo suficiente
  if (!fromAccount.hasSufficientBalance(amount)) {
    throw new Error("Insufficient balance");
  }

  // Criar a transação
  const transaction = new this({
    from: fromAccountId,
    to: toAccountId,
    amount,
    description,
    status: TransactionStatus.PENDING,
  });

  return transaction;
};

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
