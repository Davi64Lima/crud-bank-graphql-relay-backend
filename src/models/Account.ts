import { globalIdField } from "graphql-relay";
import mongoose, { Document, Schema } from "mongoose";
import { ITransaction } from "./Transaction";
import { IUser } from "./User";

export interface IAccount extends Document {
  publicId: string;
  userId: string;
  balance: number;
  transactions: String[];
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
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
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
