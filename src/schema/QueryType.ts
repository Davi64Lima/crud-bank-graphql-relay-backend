import { GraphQLObjectType } from "graphql";
import { accountQuery } from "modules/Account/queries/account";
import { accountsQuery } from "modules/Account/queries/accounts";
import { transactionsQuery } from "modules/Transaction/queries/transactions";
import { transactionQuery } from "modules/Transaction/queries/transaction";
import { userQuery } from "modules/User/queries/userQuery";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: userQuery,
    // users: usersQuery,
    account: accountQuery,
    accounts: accountsQuery,
    transaction: transactionQuery,
    transactions: transactionsQuery,
  },
});
