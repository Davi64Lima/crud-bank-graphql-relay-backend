import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../User";
import { User } from "models/User";
import { createAccountMutation } from "modules/Account/mutations/createAccount";

export const createUserMutation = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { name, email }) => {
    try {
      const newUser = new User({
        name,
        email,
      });
      const savedUser = await newUser.save();

      const account = await createAccountMutation
        .resolve(_, {
          userId: savedUser.id,
        })
        .catch((error) => {
          console.error("Error creating account:", error);
          throw new Error("Failed to create account");
        });

      const savedAccount = await savedUser.updateOne({
        accounts: [account._id],
      });

      console.log(savedUser);

      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
};
