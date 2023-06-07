import type {
  Prisma,
  Question,
  UserTest,
  UserTestAnswer,
} from "@prisma/client";
import { EvaluationGrade } from "~/components/tables";

export function getAttemptTitle(
  userTests: UserTest[],
  i: number
): { n: number; date: string } {
  const userTest = userTests[i];
  if (userTest?.submissionDate) {
    const formattedDate = userTest.submissionDate.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
    return {
      n: userTests.length - i,
      date: formattedDate,
    };
  }
  return { n: 0, date: "-" };
}

export function getAttemptIndex(userTests: UserTest[], id: string): number {
  return userTests.findIndex((value) => value.id === id);
}

export function getGradeNumber(decimal: Prisma.Decimal | null): number {
  return decimal ? Number(decimal) : -1;
}

export function getEvaluationGrade(grade: number): EvaluationGrade {
  if (grade < 10) return "A1";
  else if (grade < 25) return "A2";
  else if (grade < 50) return "B1";
  else if (grade < 75) return "B2";
  else if (grade < 90) return "C1";
  else return "C2";
}

export function getGradeText(decimal: Prisma.Decimal | null): string {
  const number = getGradeNumber(decimal);
  return number < 0 ? "-" : String(number);
}

export function getQuestionWeight(
  answers: (UserTestAnswer & { question: Question })[],
  i: number
): string {
  const answer = answers[i];
  if (answer) {
    const sumOfWeights = answers.reduce(
      (accum, item) => accum + Number(item.question.weigh),
      0
    );
    const percentage = (100 * Number(answer.question.weigh)) / sumOfWeights;
    return percentage.toFixed(2) + "%";
  }
  return "0%";
}
