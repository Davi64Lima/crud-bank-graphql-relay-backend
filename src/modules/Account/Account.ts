import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { accountQuery } from "./queries/account";
import { ListFormat } from "typescript";
import { Transaction } from "models";
import { TransactionType } from "modules/Transaction/Transaction";
import { UserType } from "modules/User/User";

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
      type: GraphQLString,
      resolve: (account) => account.user,
    },
    balance: {
      type: GraphQLInt,
      resolve: (account) => account.balance,
    },
    // transactions: {
    //   type: TransactionConnection,
    //   args: connectionArgs,
    //   description: "List of transactions for the account",
    //   resolve: async (account, args) => {
    //     console.log(account._id);

    //     const transactions = await transactionDataLoader.load(account._id);
    //     return connectionFromArray(transactions, args);
    //   },
    // },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve: (accountId) => {
        const transactions = Transaction.find({
          $or: [{ from: accountId }, { to: accountId }],
        }).catch((error) => {
          console.error("Error fetching transactions:", error);
          return [];
        });

        return transactions;
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
