import DataLoader = require("dataloader");
import { Transaction } from "models";
import { Types } from "mongoose";

export const TransactionLoader = {
  async loadAll() {
    return await Transaction.find({}, {}, { sort: { createdAt: -1 } });
  },
  async loadAccountId(accountId: Types.ObjectId) {
    const transactions = await Transaction.find(
      { $or: [{ from: accountId }, { to: accountId }] },
      {},
      { sort: { createdAt: -1 } }
    );
    return transactions;
    // return transactions.map((transaction) =>
    //   transactionMapper(accountId, transaction)
    // );
  },
};
