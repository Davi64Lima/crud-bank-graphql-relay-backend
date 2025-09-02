import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { AccountType } from "../Account";
import { Account } from "models/Account";

export const accountQuery = {
  type: AccountType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (obj, args, cntx, info) => {
    console.log("object", obj);
    console.log("args", args);
    console.log("cntx", cntx);
    console.log("info", info);
    const { id } = args;
    const account = Account.findById(id);

    return account;
  },
};
