import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const learnRouter = createTRPCRouter({
  getTests: publicProcedure.query(async ({ ctx }) => {
    //const user = ctx.session.user;

    const tests = await prisma.test.findMany({ where: { type: { gt: 0 } } });

    return tests;
  }),
});
