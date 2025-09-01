import { GraphQLID, GraphQLNonNull } from "graphql";
import { TransactionType } from "../Transaction";

export const transactionQuery = {
  type: TransactionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => {
    return {
      id: id,
      from: 1,
      to: 2,
      amount: 10,
      createdAt: new Date(),
    };
  },
};
