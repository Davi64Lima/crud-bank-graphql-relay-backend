import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../User";
import { User } from "models/User";
export const userQuery = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (obj, { email }, cntx, info) => {
    const user = await User.findOne({ email });

    console.log(user);

    return user;
  },
};
