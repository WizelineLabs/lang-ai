import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useQueryStatePicker } from "~/hooks";
import {
  Dropdown,
  DropdownButton,
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
  Spinner,
} from "~/components";
import { GradesRow } from "~/components/tables";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { getEvaluationGrade, getGradeNumber } from "~/utils/gradesCalculations";

type PickerOptions = "Learn" | "Evaluations";

function getPickerOption(string: string): PickerOptions {
  if (string == "learn") {
    return "Learn";
  } else if (string == "evaluations") {
    return "Evaluations";
  } else {
    return "Learn";
  }
}

const Grades: NextPage = () => {
  const session = useSession();

  const [selectedCategory, setSelectedCategory] = useQueryStatePicker(
    "category",
    { defaultValue: "learn", allowedValues: new Set(["learn", "evaluations"]) }
  );

  function didSelectInPicker(category: PickerOptions) {
    setSelectedCategory(category.toLowerCase());
  }

  const {
    data: grades,
    isLoading,
    error,
  } = api.grades.getGrades.useQuery({ category: selectedCategory });

  const GradesPage = () => (
    <PageWrapper>
      <PageTitle editsTitle>Grades</PageTitle>
      <div className="flex flex-row place-content-between">
        <SegmentedPicker
          title="Choose category:"
          selectedOption={getPickerOption(selectedCategory)}
          options={["Learn", "Evaluations"]}
          didSelectOption={(o) => didSelectInPicker(o)}
        />
        <Dropdown
          id={"date-dropdown"}
          dataDropdownToggle={"date-dropdown"}
          menuButtonContent={(ChevronIcon) => (
            <span className="text-slate-700">
              Order by:
              <span className="ml-1 inline-flex text-slate-500 hover:opacity-50">
                Date{ChevronIcon}
              </span>
            </span>
          )}
        >
          <DropdownButton onClick={() => console.log("1")}>Date</DropdownButton>
          <DropdownButton onClick={() => console.log("2")}>
            Level
          </DropdownButton>
        </Dropdown>
      </div>
      {grades && grades.length > 0 ? (
        <Section>
          <div className="space-0 flex flex-col divide-y">
            {grades.map((userTest) => {
              if (!userTest) return <></>;

              const isEvaluation = userTest.test.type === 0;
              const gradeNumber = getGradeNumber(userTest.score);

              const gradeForIcon = isEvaluation
                ? getEvaluationGrade(gradeNumber)
                : gradeNumber;

              return (
                <GradesRow
                  key={userTest.id}
                  title={userTest.test.name}
                  description={userTest.test.description ?? ""}
                  date={userTest.submissionDate ?? new Date()}
                  grade={gradeForIcon}
                  buttonHref={`/grades/${userTest.test.id}/${userTest.id}`}
                />
              );
            })}
          </div>
        </Section>
      ) : (
        <div className="mt-8 grid w-full justify-center py-16">
          <div hidden={!isLoading} className="mx-auto text-secondary">
            <Spinner />
          </div>
          <p hidden={isLoading} className="text-center text-sm text-secondary">
            {error ? error.message : "No data to show."}
          </p>
        </div>
      )}
    </PageWrapper>
  );
  const ErrorPage = () => (
    <PageWrapper>
      <PageTitle editsTitle>404 Page Not Found</PageTitle>
      <p className="py-3 font-normal text-gray-700 dark:text-gray-500">
        I'm sorry, it seems this page is not accessible at the moment.
      </p>
    </PageWrapper>
  );

  if (session.data?.user.isAdmin) {
    return <ErrorPage />;
  }
  return <GradesPage />;
};

export default Grades;
