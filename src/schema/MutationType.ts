import { GraphQLObjectType } from "graphql";
import { createAccountMutation } from "modules/Account/mutations/createAccount";
import { createUserMutation } from "modules/User/mutations/createUserMutation";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUserMutation,
    createAccount: createAccountMutation,
  },
});
