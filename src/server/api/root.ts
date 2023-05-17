import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { filesRouter } from "./routers/files";
import { learnRouter } from "./routers/learn";
import { gradesRouter } from "./routers/grades";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  files: filesRouter,
  grades: gradesRouter,
  learn: learnRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
