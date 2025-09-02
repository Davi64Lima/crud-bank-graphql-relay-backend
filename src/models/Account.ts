import mongoose, { Document, Schema } from "mongoose";
import { ITransaction } from "./Transaction";
import { IUser } from "./User";

export interface IAccount extends Document {
  publicId: string;
  userId: string;
  user: IUser;
  balance: number;
  transactions: ITransaction[];
  createdAt: Date;
  updatedAt: Date;

  // Métodos customizados
  hasSufficientBalance(amount: number): boolean;
  debit(amount: number): void;
  credit(amount: number): void;
}

const AccountSchema = new Schema<IAccount>(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // Não permite saldo negativo
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    collection: "accounts",
  }
);

// Índices para performance
AccountSchema.index({ createdAt: -1 });

// Método para verificar se a conta tem saldo suficiente
AccountSchema.methods.hasSufficientBalance = function (
  amount: number
): boolean {
  return this.balance >= amount;
};

// Método para debitar valor da conta
AccountSchema.methods.debit = function (amount: number): void {
  if (!this.hasSufficientBalance(amount)) {
    throw new Error("Insufficient balance");
  }
  this.balance -= amount;
};

// Método para creditar valor na conta
AccountSchema.methods.credit = function (amount: number): void {
  this.balance += amount;
};

export const Account = mongoose.model<IAccount>("Account", AccountSchema);
