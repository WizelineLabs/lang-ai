import { type NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownButton,
  LoadingSection,
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
  Spinner,
} from "~/components";
import { isRequestSuccess } from "~/server/models";

import { api } from "~/utils/api";
import AlertContext from "~/contexts/AlertContext";
import { Prisma, Question, UserTest, UserTestAnswer } from "@prisma/client";
import { GradeIcon } from "~/components/tables";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { formatDateDiff } from "~/utils/formatSecondsToTime";

const TestGrades: NextPage = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);

  // Handling of test data
  const testId = router.query.testId?.toString() ?? "";
  const userTestId = router.query.userTestId?.toString() ?? "";
  const { data, isLoading, error } = api.grades.getTestAttempt.useQuery({
    testId: testId,
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
          .push("/grades/")
          .finally(() => console.warn("Redirected outside of test grades"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router]);

  function didChangeAttempt(newUserTestId: string) {
    router
      .replace(`/grades/${testId}/${newUserTestId}`)
      .finally(() => console.log("Changed test attempt"));
  }

  function AttemptTitle({ n, date }: { n: number; date: string }) {
    return (
      <span>
        {n} <span className="text-secondary">({date})</span>
      </span>
    );
  }

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
                <span className="text-base text-secondary">
                  {data.value.userTest.test.description ?? "-"}
                </span>
              </div>
              <Dropdown
                id={"date-dropdown"}
                dataDropdownToggle={"date-dropdown"}
                menuButtonContent={(ChevronIcon) => (
                  <span className="text-slate-700">
                    Attempt:
                    <span className="ml-1 inline-flex text-slate-500 hover:opacity-50">
                      <AttemptTitle
                        {...getAttemptTitle(
                          data.value.allUserTests,
                          getAttemptIndex(data.value.allUserTests, userTestId)
                        )}
                      />
                      {ChevronIcon}
                    </span>
                  </span>
                )}
              >
                {data.value.allUserTests.map((userTest, i) => (
                  <DropdownButton
                    key={userTest.id}
                    onClick={() => didChangeAttempt(userTest.id)}
                  >
                    <AttemptTitle
                      {...getAttemptTitle(data.value.allUserTests, i)}
                    />
                  </DropdownButton>
                ))}
              </Dropdown>
            </div>
            <Section title="Attempt Information">
              <div className="flex flex-row justify-around gap-3 px-6 py-5">
                <div className="flex flex-col items-center justify-center gap-1">
                  <GradeIcon
                    grade={getGradeNumber(data.value.userTest.score)}
                  />
                  <span className="text-sm text-secondary">
                    {getGradeNumber(data.value.userTest.score) < 0
                      ? "Not Graded"
                      : "Score"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="my-auto text-xl font-bold">
                    {formatDateDiff(
                      data.value.userTest.startDate,
                      data.value.userTest.submissionDate ?? new Date()
                    )}
                  </span>
                  <span className="text-sm text-secondary">Time taken</span>
                </div>
              </div>
            </Section>
            <Section title="Feedback">
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
            </Section>
            <Section title="Answers" noBackground>
              <div className="mt-2 flex flex-col gap-3">
                {data.value.userTest.user_test_answer.map(
                  (userTestAnswer, i) => (
                    <div
                      key={userTestAnswer.id}
                      className="mx-auto w-full rounded-2xl border bg-white p-2"
                    >
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full gap-2.5 rounded-lg bg-slate-100 px-4 py-2 text-left text-sm font-medium text-primary hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                              <div className="flex w-full justify-between">
                                <span>
                                  Question {i + 1} (
                                  {getQuestionWeight(
                                    data.value.userTest.user_test_answer,
                                    i
                                  )}
                                  )
                                </span>
                                <div className="flex gap-2">
                                  <span className="text-secondary">
                                    Score:{" "}
                                    {getGradeText(userTestAnswer.evaluation)}
                                  </span>
                                </div>
                              </div>
                              <ChevronUpIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-slate-500`}
                              />
                            </Disclosure.Button>
                            <Transition
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Disclosure.Panel className="pb-2 pl-4 pr-3 pt-4 text-sm text-primary">
                                <div className="grid grid-cols-2 divide-x">
                                  <div className="flex flex-col pr-4">
                                    <div className="flex flex-col gap-1">
                                      <span className="font-bold">
                                        Question
                                      </span>
                                      <span className="whitespace-pre-wrap break-words">
                                        {userTestAnswer.question.text}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-3 pl-4">
                                    <div className="flex flex-col gap-1">
                                      <span className="font-bold">Answer</span>
                                      <span className="whitespace-pre-wrap break-words">
                                        {userTestAnswer.answer}
                                      </span>
                                    </div>
                                    {userTestAnswer.evaluation ? (
                                      <div className="flex flex-col gap-3 rounded-lg bg-slate-100 px-3 py-2">
                                        <div className="flex flex-col gap-1">
                                          <span className="font-bold">
                                            Reason for score
                                          </span>
                                          <span className="whitespace-pre-wrap break-words">
                                            {userTestAnswer.evaluationReason ??
                                              "Not yet graded"}
                                          </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                          <span className="font-bold">
                                            Feedback
                                          </span>
                                          <span className="whitespace-pre-wrap break-words">
                                            {userTestAnswer.feedback ??
                                              "No feedback yet."}
                                          </span>
                                        </div>
                                        <p className="mr-2 text-right text-xs text-slate-400">
                                          <InformationCircleIcon className="mb-0.5 inline h-4" />{" "}
                                          Powered by Wizeline AI
                                        </p>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  )
                )}
              </div>
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
