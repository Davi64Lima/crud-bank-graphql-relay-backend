import { GraphQLNonNull, GraphQLString } from "graphql";
import { AccountType } from "../Account";

export const createAccountMutation = {
  type: AccountType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { name }) => {
    return { id: "1", name, balance: 0 };
  },
};
