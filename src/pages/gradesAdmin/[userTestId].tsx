import { type NextPage } from "next";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { LoadingSection, PageTitle, PageWrapper, Section } from "~/components";
import { isRequestSuccess } from "~/server/models";
import { api } from "~/utils/api";
import AlertContext from "~/contexts/AlertContext";
import type {
  Prisma,
  Question,
  UserTest,
  UserTestAnswer,
} from "@prisma/client";
import { AnswersSection } from "~/components/grades/AnswersSection";
import { AttemptInfoSection } from "~/components/grades/AttemptInfoSection";

const TestGrades: NextPage = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);

  // Handling of test data
  const userTestId = router.query.userTestId?.toString() ?? "";

  const { data, isLoading, error } = api.gradesAdmin.getTestAttempt.useQuery({
    userTestId: userTestId,
  });

  const value = data && isRequestSuccess(data) ? data.value : undefined;

  useEffect(() => {
    if (data) {
      if (isRequestSuccess(data)) {
      } else {
        showAlert(data.error.message);
        console.error(data.error.message);
        // Redirect to grades if userTest could'nt be obtained
        // TODO: Redirect if error is related to userTest
        router
          .push("/gradesAdmin/")
          .finally(() => console.warn("Redirected outside of test grades"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router]);

  console.log(value?.userTest.score);

  return (
    <>
      <PageWrapper>
        {data && isRequestSuccess(data) ? (
          <div className="flex flex-col">
            <div className="mx-5 flex flex-row place-content-between">
              <div className="flex flex-col gap-y-2">
                <PageTitle editsTitle>
                  {data.value.userTest.test.name}
                </PageTitle>
                {data.value.userTest.test.description && (
                  <span className="text-base text-secondary">
                    {data.value.userTest.test.description}
                  </span>
                )}
              </div>
            </div>
            <Section title="Attempt Information">
              <AttemptInfoSection userTest={data.value.userTest} />
            </Section>
            {/* <Section title="Feedback">
              <div className="flex flex-col space-y-2 px-6 pb-4 pt-5">
                <p className="text-sm text-secondary">
                  {data.value.userTest.feedback ??
                    "No feedback has been generated yet."}
                </p>
                <p className="text-right text-xs text-slate-400">
                  <InformationCircleIcon className="mb-0.5 inline h-4" />{" "}
                  Powered by Wizeline AI
                </p>
              </div>
            </Section> */}
            <Section title="Answers" noBackground>
              <AnswersSection userTest={data.value.userTest} />
            </Section>
          </div>
        ) : (
          <LoadingSection
            isLoading={isLoading}
            error={data?.error}
            defaultError={error?.message ?? "Ocurrió un error desconocido."}
          />
        )}
      </PageWrapper>
    </>
  );
};

export default TestGrades;

function getAttemptTitle(
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

function getAttemptIndex(userTests: UserTest[], id: string): number {
  return userTests.findIndex((value) => value.id === id);
}

function getGradeNumber(decimal: Prisma.Decimal | null): number {
  return decimal ? Number(decimal) : -1;
}

function getGradeText(decimal: Prisma.Decimal | null): string {
  const number = getGradeNumber(decimal);
  return number < 0 ? "-" : String(number);
}

function getQuestionWeight(
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
