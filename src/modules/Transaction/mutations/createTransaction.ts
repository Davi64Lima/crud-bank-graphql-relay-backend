import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { TransactionType } from "../Transaction";

export const createAccountMutation = {
  type: TransactionType,
  args: {
    from: { type: new GraphQLNonNull(GraphQLInt) },
    to: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (_, { from, to }) => {
    return { id: 1, from, to, amount: 100, createdAt: "16816816" };
  },
};
