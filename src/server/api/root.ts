import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { filesRouter } from "./routers/files";
import { learnRouter } from "./routers/learn";
import { evaluationsRouter } from "./routers/evaluations";
import { testRouter } from "./routers/test";
import { gradesRouter } from "./routers/grades";
import { usersRouter } from "./routers/user";
import { gradesAdminRouter } from "./routers/gradesAdmin";

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
  evaluations: evaluationsRouter,
  test: testRouter,
  users: usersRouter,
  gradesAdmin: gradesAdminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
