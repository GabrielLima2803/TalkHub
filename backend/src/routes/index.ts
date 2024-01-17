import { Router } from "express";
import { userRoutes } from "./user.routes";
import { chatRouter } from "./chat.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/conversation", chatRouter);

export {routes}