import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    from: { type: new GraphQLNonNull(GraphQLID) },
    to: { type: new GraphQLNonNull(GraphQLID) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});
