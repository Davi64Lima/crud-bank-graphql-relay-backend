import { GraphQLObjectType } from "graphql";
import { accountQuery } from "modules/Account/queries/account";
import { accountsQuery } from "modules/Account/queries/accounts";
import { transactionsQuery } from "modules/Transaction/queries/transactions";
import { transactionQuery } from "modules/Transaction/queries/transaction";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    account: accountQuery,
    accounts: accountsQuery,
    transaction: transactionQuery,
    transactions: transactionsQuery,
  },
});
