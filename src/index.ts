import * as http from "http";

import { app } from "./server/app";
import { config } from "./config";
import { connectDb } from "./db";

(async () => {
  await connectDb();

  const server = http.createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`Server running on port:${config.PORT}`);
  });
})();
