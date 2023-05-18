import { Question, Test, UserTest, UserTestAnswer } from "@prisma/client";
import { z } from "zod";
import path from "path";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { RequestError, RequestSuccess } from "~/server/models";
import { prisma } from "~/server/db";

type GetTestDataReturnType = Promise<
  | RequestSuccess<{
      userTest: UserTest & {
        test: Test;
      };
      questions: Question[];
      startInQuestion: number;
    }>
  | RequestError
>;

type PrepareStartForTestReturnType = Promise<
  RequestSuccess<UserTest> | RequestError
>;

type AnswerQuestionReturnType = Promise<
  | RequestSuccess<{ answer: UserTestAnswer; isLastQuestion: boolean }>
  | RequestError
>;

export const testRouter = createTRPCRouter({
  getTestData: protectedProcedure
    .input(z.object({ testId: z.string(), userTestId: z.string() }))
    .query(async function ({ input, ctx }): GetTestDataReturnType {
      try {
        const userId = ctx.session.user.id;
        const testId = input.testId;
        const userTestId = input.userTestId;

        // Obtener UserTest
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

        // Validar UserTest
        if (!userTest) {
          return {
            success: false,
            code: "userTestNotFound",
            error: new Error("No se pudo encontrar la sesión."),
          };
        }

        if (userId !== userTest.user_id) {
          return {
            success: false,
            code: "userTestNotForCurrentUser",
            error: new Error(
              "Este ejercicio fue realizado por otra persona. Evita compartir enlaces de LangAI con otras personas."
            ),
          };
        }

        // No permitir entrar el examen si este ya está terminado
        if (userTest.submitted) {
          return {
            success: false,
            code: "userTestAlreadySubmitted",
            error: new Error("Ya habías finalizado este ejercicio antes."),
          };
        }

        // Obtener datos sobre preguntas y respuestas
        const questions = await prisma.question.findMany({
          where: { test_id: testId },
        });

        const numberOfAnswers = await prisma.userTestAnswer.count({
          where: { userTestId: userTestId },
        });

        return {
          success: true,
          value: {
            userTest: userTest,
            questions: questions,
            startInQuestion: numberOfAnswers,
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

  answerQuestion: protectedProcedure
    .input(
      z.object({
        userTestId: z.string(),
        questionId: z.string(),
        textAnswer: z.optional(z.string()),
        videoBase64: z.string(),
        // mimeType: z.string(),
        extension: z.string(),
      })
    )
    .mutation(async function ({ input, ctx }): AnswerQuestionReturnType {
      try {
        // const userId = ctx.session.user.id;
        const userTestId = input.userTestId;
        const questionId = input.questionId;

        // Answer if question exists
        const question = await prisma.question.findUnique({
          where: { id: questionId },
        });
        if (!question) {
          return {
            success: false,
            code: "questionDoesntExist",
            error: new Error(
              "Ocurrió un error inesperado. Código de error: 201"
            ),
          };
        }

        const answer = await prisma.userTestAnswer.create({
          data: {
            questionId: questionId,
            userTestId: userTestId,
            answer: input.textAnswer ?? "",
          },
        });

        const hasVideo = !input.textAnswer;
        if (hasVideo && input.videoBase64) {
          const fileName = answer.id + "." + input.extension;
          const filePath = path.join("learn", userTestId, fileName);
          const buffer = Buffer.from(input.videoBase64);

          const { uploadFile } = await import("~/services/aws/s3");
          await uploadFile(buffer, filePath);
        }

        // Check if all questions have been answered
        const numberOfQuestions = await prisma.question.count({
          where: { test_id: question.test_id },
        });
        const numberOfAnswers = await prisma.userTestAnswer.count({
          where: { userTestId: userTestId },
        });

        const isTestFinished = numberOfQuestions === numberOfAnswers;

        if (isTestFinished) {
          // Submit test
          await prisma.userTest.update({
            where: { id: userTestId },
            data: {
              submitted: true,
              submissionDate: new Date(),
              score: Math.min(Math.floor(Math.random() * 101), 100),
            },
          });
        }

        return {
          success: true,
          value: {
            answer: answer,
            isLastQuestion: isTestFinished,
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
