import DataLoader = require("dataloader");
import { Account, IAccount } from "models";

const accountByIdLoader = new DataLoader(async (ids: readonly string[]) => {
  const accounts = await Account.find({ _id: { $in: ids } });
  const accountMap = new Map(
    accounts.map((account) => [account._id.toString(), account])
  );
  return ids.map((id) => accountMap.get(id) || null);
});
