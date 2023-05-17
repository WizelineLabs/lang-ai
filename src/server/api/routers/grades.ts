import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const gradesRouter = createTRPCRouter({
  getGrades: protectedProcedure
  .input(z.object({ category: z.string() }))
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const isEvaluations = input.category === 'evaluations'

    // Get all the tests of a specific type
    const testsOfType = await prisma.test.findMany({
        where: {
            type: isEvaluations ? 0 : { gt: 0 },
        },
    });

    // Get the unique test IDs of the specific type
    const testIds = testsOfType.map((test) => test.id);

    // Get all the unique tests that the user has attempted and are of the specific type
    const userTests = await prisma.userTest.findMany({
        where: {
            user_id: userId,
            test_id: {
                in: testIds,
            },
        },
        select: {
            test_id: true,
        },
        distinct: ['test_id'],
    });

    // Now, for each unique test, get the latest attempt
    const latestAttempts = await Promise.all(userTests.map(async (userTest) => {
        return await prisma.userTest.findFirst({
            where: {
                user_id: userId,
                test_id: userTest.test_id,
            },
            orderBy: {
                submissionDate: 'desc',
            },
            include: {
                test: true,
            },
        });
    }));

    return latestAttempts;
  }),
});