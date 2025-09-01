import mongoose, { Document, Schema } from "mongoose";

export interface IAccount extends Document {
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;

  // Métodos customizados
  hasSufficientBalance(amount: number): boolean;
  debit(amount: number): void;
  credit(amount: number): void;
}

const AccountSchema = new Schema<IAccount>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // Não permite saldo negativo
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    collection: "accounts",
  }
);

// Índices para performance
AccountSchema.index({ name: 1 });
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
