import { GraphQLObjectType } from "graphql";
import { accountQuery } from "graphql/Account/queries/account";
import { accountsQuery } from "graphql/Account/queries/accounts";
import { transactionsQuery } from "graphql/Transaction/queries/transactions";
import { transactionQuery } from "graphql/Transaction/queries/transaction";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    account: accountQuery,
    accounts: accountsQuery,
    transaction: transactionQuery,
    transactions: transactionsQuery,
  },
});
