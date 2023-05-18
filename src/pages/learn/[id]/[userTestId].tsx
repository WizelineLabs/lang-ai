import { type NextPage } from "next";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AlertContext from "~/contexts/AlertContext";

import { api } from "~/utils/api";

import ResponseVideo from "~/components/test/ResponseVideo";
import InstructionText from "~/components/test/InstructionTextProps";

import {
  Button,
  ChevronIcon,
  LoadingSection,
  PageTitle,
  PageWrapper,
  Section,
} from "~/components";
import { isRequestSuccess } from "~/server/models";
import { type Question } from "@prisma/client";

const Exercise: NextPage = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);

  // Handling of test data
  const testId = router.query.id?.toString() ?? "";
  const userTestId = router.query.userTestId?.toString() ?? "";
  const { data, isLoading, error } = api.test.getTestData.useQuery({
    testId: testId,
    userTestId: userTestId,
  });

  const value = data && isRequestSuccess(data) ? data.value : undefined;

  useEffect(() => {
    if (data) {
      if (isRequestSuccess(data)) {
        // If there are answers further ahead, move up to that question
        if (currentQuestionIndex < data.value.startInQuestion) {
          setCurrentQuestionIndex(data.value.startInQuestion);
        }
      } else {
        showAlert(data.error.message);
        console.error(data.error.message);
        // Redirect to learn if userTest could'nt be obtained
        // TODO: Redirect if error is related to userTest
        router
          .push("/learn/")
          .finally(() => console.warn("Redirected outside of test"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function getCurrentQuestion(questions: Question[], i: number) {
    return i > 0 && i < questions.length ? questions[i] : questions[0];
  }

  const isLastQuestion = value
    ? currentQuestionIndex >= value.questions.length - 1
    : false;

  const [currentVideoData, setCurrentVideoData] = useState<string | null>(null);
  const [currentVideoExtension, setCurrentVideoExtension] =
    useState<string>("");

  const mutation = api.test.answerQuestion.useMutation();

  async function goToNextQuestion() {
    if (!value) return;

    const currentQuestion = getCurrentQuestion(
      value.questions,
      currentQuestionIndex
    );
    if (!currentQuestion) return;

    const result = await mutation.mutateAsync({
      questionId: currentQuestion.id,
      userTestId: userTestId,
      textAnswer: undefined,
      videoBase64: currentVideoData ?? "",
      extension: currentVideoExtension,
    });

    if (!isRequestSuccess(result)) {
      throw result.error;
    }

    if (!result.value.isLastQuestion) {
      // Go to next question
      setCurrentQuestionIndex((previous) => previous + 1);
      setCurrentVideoData(null);
    } else {
      // This is the final question (end the test)
      await router.push(`/learn/finished`);
    }
  }

  function didTapNextQuestion() {
    goToNextQuestion()
      .then(() => console.log("Moved to next question"))
      .catch((e) => {
        const error = e as Error;
        console.error(error);
        showAlert(error.message ?? "Hubo un error desconocido.");
      });
  }

  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>
                {value?.userTest.test.name ?? "Untitled"}
              </PageTitle>
            </div>

            <div className="my-auto flex flex-row space-x-5">
              {value && (
                <h2 className="font-sm py-3">
                  {currentQuestionIndex + 1} of {value.questions.length}
                </h2>
              )}
              {/* <Button>Previous</Button> */}
              <Button
                className="my-auto"
                theme={isLastQuestion ? "primary-inverted" : "primary"}
                icon={<ChevronIcon />}
                iconInRight
                isLoading={mutation.isLoading}
                disabled={mutation.isLoading || !currentVideoData}
                onClick={didTapNextQuestion}
              >
                {isLastQuestion ? "Finish" : "Next"}
              </Button>
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
              <ResponseVideo
                key={currentQuestionIndex}
                didGetNewVideo={(file, ext) => {
                  setCurrentVideoData(file);
                  setCurrentVideoExtension(ext);
                }}
              />
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
