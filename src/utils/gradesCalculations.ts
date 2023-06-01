import type {
  Prisma,
  Question,
  UserTest,
  UserTestAnswer,
} from "@prisma/client";

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
