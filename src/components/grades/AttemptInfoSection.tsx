import type { Question, Test, UserTest, UserTestAnswer } from "@prisma/client";
import { GradeIcon } from "~/components/tables";
import { formatDateDiff } from "~/utils/formatSecondsToTime";
import { getEvaluationGrade, getGradeNumber } from "~/utils/gradesCalculations";

export interface AttemptInfoSectionProps {
  userTest: UserTest & {
    test: Test;
    user_test_answer: (UserTestAnswer & {
      question: Question;
    })[];
  };
}

export function AttemptInfoSection(props: AttemptInfoSectionProps) {
  const { userTest } = props;

  const isEvaluation = userTest.test.type === 0;
  const gradeNumber = getGradeNumber(userTest.score);

  const gradeForIcon = isEvaluation
    ? getEvaluationGrade(gradeNumber)
    : gradeNumber;

  return (
    <div className="flex flex-row justify-around gap-3 px-6 py-5">
      <div className="flex flex-col items-center justify-center gap-1">
        <GradeIcon grade={gradeForIcon} />
        <span className="text-sm text-secondary">
          {gradeNumber < 0
            ? "Not Graded"
            : isEvaluation
            ? "English Level"
            : "Score"}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="my-auto text-xl font-bold">
          {formatDateDiff(
            userTest.startDate,
            userTest.submissionDate ?? new Date()
          )}
        </span>
        <span className="text-sm text-secondary">Time taken</span>
      </div>
    </div>
  );
}
