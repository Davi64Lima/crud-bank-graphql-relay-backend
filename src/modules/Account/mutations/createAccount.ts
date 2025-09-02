import { GraphQLNonNull, GraphQLString } from "graphql";
import { AccountType } from "../Account";
import { Account } from "models/Account";

export const createAccountMutation = {
  type: AccountType,
  args: {
    user: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { user }) => {
    const newAccount = new Account({
      user,
      balance: 0,
    });
    return newAccount.save();
  },
};
