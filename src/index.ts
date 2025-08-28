import { bodyParser } from "@koa/bodyparser";
import * as Koa from "koa";

const app = new Koa();
app.use(
  bodyParser({
    detectJSON(ctx) {
      return /\.json$/i.test(ctx.path);
    },
    onError(err, ctx) {
      console.error(
        `body parse error: ${err} on ${ctx.path} with body: ${ctx.request.body}`
      );
      ctx.throw(422, "body parse error");
    },
  })
);

app.use(async (ctx) => {
  ctx.body = ctx.request.body;
});

app.listen(4000);
