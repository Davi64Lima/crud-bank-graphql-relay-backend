import { GraphQLObjectType } from "graphql";
import { createAccountMutation } from "modules/Account/mutations/createAccount";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAccount: createAccountMutation,
  },
});
