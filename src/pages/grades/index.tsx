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
} from "~/components";
import { GradesRow } from "~/components/tables";

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
  const [selectedCategory, setSelectedCategory] = useQueryStatePicker(
    "category",
    { defaultValue: "learn", allowedValues: new Set(["learn", "evaluations"]) }
  );

  function didSelectInPicker(category: PickerOptions) {
    setSelectedCategory(category.toLowerCase());
  }

  return (
    <>
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
            <DropdownButton title="Date" onClick={() => console.log("1")} />
            <DropdownButton title="Level" onClick={() => console.log("2")} />
          </Dropdown>
        </div>

        <Section>
          <div className="space-0 flex flex-col divide-y">
            <GradesRow
              title={
                selectedCategory === "learn"
                  ? "Lesson 1"
                  : "Untitled Evaluation"
              }
              description={selectedCategory === "learn" ? "Description." : ""}
              date={new Date()}
              grade={selectedCategory === "learn" ? 74 : "C1"}
            />
            <GradesRow
              title={
                selectedCategory === "learn"
                  ? "Lesson 2"
                  : "Untitled Evaluation"
              }
              description={selectedCategory === "learn" ? "Description." : ""}
              date={new Date()}
              grade={selectedCategory === "learn" ? 39 : "B2"}
            />
            <GradesRow
              title={
                selectedCategory === "learn"
                  ? "Lesson 3"
                  : "Untitled Evaluation"
              }
              description={selectedCategory === "learn" ? "Description." : ""}
              date={new Date()}
              grade={selectedCategory === "learn" ? 65 : "A2"}
            />
          </div>
        </Section>
      </PageWrapper>
    </>
  );
};

export default Grades;
