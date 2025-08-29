import Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "kcors";
import { graphqlHTTP } from "koa-graphql";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import { schema } from "schema/schema";

const app = new Koa();

app.use(cors({ origin: "*" }));
app.use(logger());
app.use(
  bodyParser({
    onerror(err, ctx) {
      ctx.throw(err, 422);
    },
  })
);

const routes = new Router();

routes.all(
  "/graphql",
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
  }))
);

app.use(routes.routes());
app.use(routes.allowedMethods());

export { app };
