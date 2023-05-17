import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import SegmentedPicker from "~/components/SegmentedPicker";
import Section from "~/components/Section";
import { Dropdown, DropdownButton } from "~/components/Dropdown";
import { GradesRow } from "~/components/tables";

type PickerOptions = "Learn" | "Evaluations";

const Grades: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("Learn");

  return (
    <>
      <PageWrapper>
        <PageTitle editsTitle>Grades</PageTitle>
        <div className="flex flex-row place-content-between">
          <SegmentedPicker
            title="Choose category:"
            selectedOption={selectedCategory}
            options={["Learn", "Evaluations"]}
            didSelectOption={(o) => setSelectedCategory(o)}
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
                selectedCategory === "Learn"
                  ? "Lesson 1"
                  : "Untitled Evaluation"
              }
              description={selectedCategory === "Learn" ? "Description." : ""}
              date={new Date()}
              grade={selectedCategory === "Learn" ? 74 : "C1"}
            />
            <GradesRow
              title={
                selectedCategory === "Learn"
                  ? "Lesson 2"
                  : "Untitled Evaluation"
              }
              description={selectedCategory === "Learn" ? "Description." : ""}
              date={new Date()}
              grade={selectedCategory === "Learn" ? 39 : "B2"}
            />
            <GradesRow
              title={
                selectedCategory === "Learn"
                  ? "Lesson 3"
                  : "Untitled Evaluation"
              }
              description={selectedCategory === "Learn" ? "Description." : ""}
              date={new Date()}
              grade={selectedCategory === "Learn" ? 65 : "A2"}
            />
          </div>
        </Section>
      </PageWrapper>
    </>
  );
};

export default Grades;
