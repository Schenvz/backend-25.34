import { fork } from "child_process";

import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.api.js";
import EventsRouter from "./events.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./sessions.router.api.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const event = new EventsRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/events", event.getRouter());
    this.use("/orders", passCallBackMid("jwt"), ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
        console.log("global process id: " + process.pid);
        const child = fork("./src/utils/sum.util.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
      } catch (error) {
        return next(error);
      }
    });
  }
}
