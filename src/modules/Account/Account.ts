import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Account } from "models";
import { globalIdField } from "graphql-relay";
import { accountQuery } from "./queries/account";

export const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: globalIdField("account"),
    publicId: {
      type: GraphQLID,
      resolve: (account) => account.publicId,
    },
    userId: {
      type: GraphQLString,
      resolve: (account) => account.userId,
    },
    user: {
      type: UserType,
      resolve: (account) => account.user,
    },
    balance: {
      type: GraphQLInt,
      resolve: (account) => account.balance,
    },
    transactions: {
      type: TransactionConnection,
      args: connectionArgs,
      description: "List of transactions for the account",
      resolve: async (account, args) => {
        console.log(account._id);

        const transactions = await transactionDataLoader.load(account._id);
        return connectionFromArray(transactions, args);
      },
    },
    createdAt: {
      type: GraphQLString,
      resolve: (account) => account.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (account) => account.updatedAt,
    },
  }),
});
