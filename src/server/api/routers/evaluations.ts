import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import type { RequestError, RequestSuccess } from "~/server/models";
import { getEvaluationGrade } from "~/utils/gradesCalculations";

type GetCurrentEnglishLevelReturnType = Promise<
  | RequestSuccess<{
      cefrString: string;
      isEnoughForWizeline: boolean;
    }>
  | RequestError
>;

export const evaluationsRouter = createTRPCRouter({
  getCurrentEnglishLevel: protectedProcedure.query(async function ({
    ctx,
  }): GetCurrentEnglishLevelReturnType {
    try {
      const user = ctx.session.user;

      const userTest = await prisma.userTest.findFirst({
        where: { user_id: user.id, score: { gte: 0 }, test: { type: 0 } },
        include: { test: true },
        orderBy: { submissionDate: "desc" },
      });

      if (userTest && userTest.score) {
        // User has answered evaluation
        const evaluationGrade = getEvaluationGrade(userTest.score.toNumber());

        return {
          success: true,
          value: {
            cefrString: evaluationGrade,
            isEnoughForWizeline:
              evaluationGrade === "C1" || evaluationGrade === "C2",
          },
        };
      } else {
        return {
          success: true,
          value: {
            cefrString: "-",
            isEnoughForWizeline: false,
          },
        };
      }
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
