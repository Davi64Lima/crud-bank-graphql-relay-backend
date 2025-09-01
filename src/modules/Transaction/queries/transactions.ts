import { TransactionType } from "../Transaction";
import { GraphQLList } from "graphql";

export const transactionsQuery = {
  type: new GraphQLList(TransactionType),
  resolve: (_) => {
    return [
      {
        id: 1,
        from: 1,
        to: 2,
        amount: 10,
        createdAt: new Date(),
      },
      {
        id: 2,
        from: 2,
        to: 1,
        amount: 10,
        createdAt: new Date(),
      },
    ];
  },
};
