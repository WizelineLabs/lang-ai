import { Question, Test, UserTest } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { RequestError, RequestSuccess } from "~/server/models";
import { prisma } from "~/server/db";

type GetTestDataReturnType = Promise<
  | RequestSuccess<{
      userTest: UserTest & {
        test: Test;
      };
      questions: Question[];
    }>
  | RequestError
>;

type PrepareStartForTestReturnType = Promise<
  RequestSuccess<UserTest> | RequestError
>;

export const testRouter = createTRPCRouter({
  getTestData: protectedProcedure
    .input(z.object({ testId: z.string(), userTestId: z.string() }))
    .query(async function ({ input, ctx }): GetTestDataReturnType {
      try {
        const userId = ctx.session.user.id;
        const testId = input.testId;
        const userTestId = input.userTestId;

        const userTest = await prisma.userTest.findFirst({
          where: {
            id: userTestId,
            user_id: userId,
            test_id: testId,
          },
          include: { test: true },
          orderBy: {
            startDate: "desc",
          },
        });

        if (!userTest) {
          return {
            success: false,
            code: "userTestNotFound",
            error: new Error(
              "Ocurrió un error inesperado. Código de error: 100"
            ),
          };
        }

        if (userId !== userTest.user_id) {
          return {
            success: false,
            code: "userTestNotForCurrentUser",
            error: new Error(
              "Ocurrió un error inesperado. Código de error: 101"
            ),
          };
        }

        const questions = await prisma.question.findMany({
          where: { test_id: testId },
        });

        return {
          success: true,
          value: { userTest: userTest, questions: questions },
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

  prepareStartForTest: protectedProcedure
    .input(z.object({ testId: z.string() }))
    .mutation(async function ({ input, ctx }): PrepareStartForTestReturnType {
      try {
        const userId = ctx.session.user.id;
        const testId = input.testId;

        // Create UserTest
        const userTest = await prisma.userTest.create({
          data: {
            user_id: userId,
            test_id: testId,
            submitted: false,
          },
        });

        return {
          success: true,
          value: userTest,
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
