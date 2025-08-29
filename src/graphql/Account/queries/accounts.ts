import { GraphQLList } from "graphql";
import { AccountType } from "../Account";

export const accountsQuery = {
  type: new GraphQLList(AccountType),
  resolve: (_) => {
    return [
      { id: 1, name: "Test Account", balance: 1000 },
      { id: 2, name: "Test Account", balance: 1000 },
      { id: 3, name: "Test Account", balance: 1000 },
    ];
  },
};
