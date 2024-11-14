import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/api", userRoutes);

appRouter.use("/user",userRoutes);  //domain/api/v1/user request moves from api/v1 to user from app.ts to /user from index.ts
appRouter.use("/chat",chatRoutes);  //domain/api/v1/chats

export default appRouter;