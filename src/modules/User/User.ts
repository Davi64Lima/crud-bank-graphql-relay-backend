import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { AccountType } from "modules/Account/Account";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: globalIdField("user"),
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve: (user) => user.accounts,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});
