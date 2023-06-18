import { type NextPage } from "next";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownButton,
  LoadingSection,
  PageTitle,
  PageWrapper,
  Section,
} from "~/components";
import { isRequestSuccess } from "~/server/models";

import AlertContext from "~/contexts/AlertContext";
import { AnswersSection } from "~/components/grades/AnswersSection";
import { AttemptInfoSection } from "~/components/grades/AttemptInfoSection";
import { getAttemptIndex, getAttemptTitle } from "~/utils/gradesCalculations";

import { api } from "~/utils/api";

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
