import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type RequestError, type RequestSuccess } from "~/server/models";
import { prisma } from "~/server/db";
import {
  type UserTestAnswer,
  type Test,
  type UserTest,
  type Question,
} from "@prisma/client";


type GetTestAttemptReturnType = Promise<
  | RequestSuccess<{
      userTest: UserTest & {
        test: Test;
        user_test_answer: (UserTestAnswer & {
          question: Question;
        })[];
      };
      allUserTests: UserTest[];
    }>
  | RequestError
>;

export const gradesAdminRouter = createTRPCRouter({
  getGrades: publicProcedure 
    .input(z.object({ userId: z.string(), category: z.string() }))
    .query(async ({ input }) => {

    //const userId = ctx.session.user.id;
    const { userId } = input;
    const user = await prisma.user.findUnique({ where: { id: userId } });
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
  const latestAttempts = await Promise.all(
    userTests.map(async (userTest) => {
      return await prisma.userTest.findFirst({
        where: {
          user_id: userId,
          test_id: userTest.test_id,
        },
        orderBy: {
          submissionDate: "desc",
        },
        include: {
          test: true,
        },
      });
    })
  );

  return latestAttempts;
  }),
  getTestAttempt: publicProcedure
    .input(z.object({ testId: z.optional(z.string()), userId: z.optional(z.string()) ,userTestId: z.optional(z.string()) }))
    .query(async function ({ input }): GetTestAttemptReturnType {
      try {
        const userTestId =
          input.userTestId === "" ? undefined : input.userTestId; // Prevent unexpected behavior on prisma query

        // Get UserTest
        const userTest = await prisma.userTest.findFirst({
          where: {
            id: userTestId, // If undefined, goes for the most recent
            // user_id: userId,
            // test_id: testId,
         },
        include: {
          test: true,
          user_test_answer: {
            include: { question: true },
            orderBy: { date: "asc" },
          },
        },
        orderBy: userTestId
          ? undefined
          : {
              submissionDate: "desc",
            },
       });

    // Validate UserTest
    if (!userTest) {
      return {
        success: false,
        code: "userTestNotFound",
        error: new Error("No se pudo encontrar la sesión."),
      };
    }

    // Forbid entering grades if test is not submitted
    if (!userTest.submitted) {
      return {
        success: false,
        code: "userTestNotSubmitted",
        error: new Error("No has finalizado aún este ejercicio."),
      };
    }

    // Get all userTests (for attempt dropdown)
    // const userTestList = await prisma.userTest.findMany({
    //   where: {
    //     user_id: userId,
    //     test_id: testId,
    //   },
    //   orderBy: {
    //     submissionDate: "desc",
    //   },
    // });

    return {
      success: true,
      value: {
        userTest: userTest,
        allUserTests: [],
      },
    };
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      code: error.name,
      error: error,
    };
  }
}),




});