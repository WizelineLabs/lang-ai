import { useContext, useEffect } from "react";
import type { Question, Test, UserTest, UserTestAnswer } from "@prisma/client";
import { Disclosure, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { getGradeText, getQuestionWeight } from "~/utils/gradesCalculations";
import { getQuestionTypeData } from "~/utils/models";
import { isRequestSuccess } from "~/server/models";
import AlertContext from "~/contexts/AlertContext";

import { api } from "~/utils/api";
import AudioPlayer from "../AudioPlayer";

export interface AnswersSectionProps {
  userTest: UserTest & {
    test: Test;
    user_test_answer: (UserTestAnswer & {
      question: Question;
    })[];
  };
}

export function AnswersSection(props: AnswersSectionProps) {
  const { userTest } = props;
  return (
    <div className="mt-2 flex flex-col gap-3">
      {userTest.user_test_answer.map((userTestAnswer, i) => (
        <AnswerDisclosure
          key={userTestAnswer.id}
          userTestAnswer={userTestAnswer}
          i={i}
          questionWeightText={getQuestionWeight(userTest.user_test_answer, i)}
        />
      ))}
    </div>
  );
}

export interface AnswerDisclosureProps {
  userTestAnswer: UserTestAnswer & {
    question: Question;
  };
  i: number;
  questionWeightText: string;
}

function AnswerDisclosure(props: AnswerDisclosureProps) {
  const { userTestAnswer, i, questionWeightText } = props;

  const { showAlert } = useContext(AlertContext);

  const [hasAudio, hasVideo] = getQuestionTypeData(
    userTestAnswer.question.type
  );

  const { data, isLoading, error } = api.grades.getAnswerMediaURLs.useQuery({
    userTestAnswerId: userTestAnswer.id,
  });

  const value = data && isRequestSuccess(data) ? data.value : undefined;

  useEffect(() => {
    if (data) {
      if (isRequestSuccess(data)) {
      } else {
        showAlert(data.error.message);
        console.error(data.error.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="mx-auto w-full rounded-2xl border bg-white p-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full gap-2.5 rounded-lg bg-slate-100 px-4 py-2 text-left text-sm font-medium text-primary hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
              <div className="flex w-full justify-between">
                <span>
                  Question {i + 1} ({questionWeightText})
                </span>
                <div className="flex gap-2">
                  <span className="text-secondary">
                    Score: {getGradeText(userTestAnswer.evaluation)}
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
                  <div className="flex flex-col gap-3 pr-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">Question</span>
                      {value?.audioURL && (
                        <div className="flex py-2">
                          <AudioPlayer
                            width="100px"
                            audioUrl={value.audioURL}
                          />
                        </div>
                      )}
                      <span className="whitespace-pre-wrap break-words">
                        {userTestAnswer.question.text}
                      </span>
                    </div>
                    {hasAudio && userTestAnswer.question.audioTranscript && (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">Audio Transcript</span>
                        <span className="whitespace-pre-wrap break-words">
                          {removeEdgeNewlines(
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            userTestAnswer.question.audioTranscript
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 pl-4">
                    {hasVideo && (
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">Video</span>
                        {value?.videoURL ? (
                          <video
                            className="aspect-video w-full rounded-xl bg-black"
                            autoPlay={false}
                            controls
                            src={value.videoURL}
                          />
                        ) : (
                          <div className="flex aspect-video w-full rounded-xl bg-black">
                            <span>{isLoading ? "Loading..." : "Error"}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">
                        {hasVideo ? "Transcription" : "Answer"}
                      </span>
                      <span className="whitespace-pre-wrap break-words">
                        {userTestAnswer.answer}
                      </span>
                    </div>
                    {userTestAnswer.evaluation ? (
                      <div className="flex flex-col gap-3 rounded-lg bg-slate-100 px-3 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold">Reason for score</span>
                          <span className="whitespace-pre-wrap break-words">
                            {userTestAnswer.evaluationReason ??
                              "Not yet graded"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold">Feedback</span>
                          <span className="whitespace-pre-wrap break-words">
                            {userTestAnswer.feedback ?? "No feedback yet."}
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
  );
}

function removeEdgeNewlines(text: string): string {
  return text.replace(/^\n+|\n+$/g, "");
}
