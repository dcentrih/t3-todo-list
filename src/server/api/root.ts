import { userRouter } from "src/server/api/routers/user";
import { createTRPCRouter } from "src/server/api/trpc";
import { todoRouter } from "./routers/todo";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
