import { GraphQLNonNull, GraphQLString } from "graphql";
import { AccountType } from "../Account";
import { Account } from "models/Account";

export const createAccountMutation = {
  type: AccountType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { userId }) => {
    const newAccount = new Account({
      userId,
    });
    return newAccount.save();
  },
};
