import { type NextPage } from "next";
import { useRef, useState, useCallback, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AlertContext from "~/contexts/AlertContext";

import { api } from "~/utils/api";

import ResponseVideo from "~/components/test/ResponseVideo";
import InstructionText from "~/components/test/InstructionTextProps";

import {
  Button,
  LoadingSection,
  PageTitle,
  PageWrapper,
  Section,
} from "~/components";
import { isRequestSuccess } from "~/server/models";
import { Question } from "@prisma/client";

const Exercise: NextPage = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);

  const testId = router.query.id?.toString() ?? "";
  const userTestId = router.query.userTestId?.toString() ?? "";
  const { data, isLoading, error } = api.test.getTestData.useQuery({
    testId: testId,
    userTestId: userTestId,
  });

  const value = data && isRequestSuccess(data) ? data.value : undefined;

  useEffect(() => {
    if (data && !data.success) {
      showAlert(data.error.message);
      console.error(data.error.message);
      // Redirect to learn if userTest could'nt be obtained
      // TODO: Redirect if error is related to userTest
      router
        .push("/learn/")
        .finally(() => console.warn("Redirected outside of test"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function getCurrentQuestion(questions: Question[], i: number) {
    return i > 0 && i < questions.length ? questions[i] : questions[0];
  }

  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Lesson Title</PageTitle>
            </div>

            <div className="my-auto flex flex-row space-x-5">
              <h2 className="py-3 font-sans">1 of 10</h2>
              <Button>Previous</Button>

              <Button>Next</Button>
            </div>
          </div>
          {data && isRequestSuccess(data) ? (
            <>
              <Section>
                <div className="px-4 py-3">
                  <InstructionText>
                    {getCurrentQuestion(
                      data.value.questions,
                      currentQuestionIndex
                    )?.text ?? "..."}
                  </InstructionText>
                </div>
              </Section>
              <br />
              <ResponseVideo />
            </>
          ) : (
            <LoadingSection
              isLoading={isLoading}
              error={data?.error}
              defaultError={error?.message ?? "Ocurrió un error desconocido."}
            />
          )}
        </div>
      </PageWrapper>
    </>
  );
};

export default Exercise;
