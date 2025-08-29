import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { AccountType } from "../Account";

export const accountQuery = {
  type: AccountType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => {
    return { id, name: "Test Account", balance: 1000 };
  },
};
