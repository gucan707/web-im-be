import * as Koa from "koa";
import * as KoaBody from "koa-body";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";
import { createServer } from "http";

import router from "./router";

import { Server } from "socket.io";
import { WsMessage } from "./model/socket";
import { setupMongo } from "./model/mongoose";
import { handleError } from "./middleware/handleError";

setupMongo();

const app = new Koa();

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("connection");
  setTimeout(() => {
    socket.emit(WsMessage.receiveMessage, { foo: "like xll" });
  }, 2000);
});

app
  .use(handleError)
  .use(logger())
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))

  .use(KoaBody())

  .use(router.routes())
  .use(router.allowedMethods());

httpServer.listen(3030);

console.log("listen on 3030");
