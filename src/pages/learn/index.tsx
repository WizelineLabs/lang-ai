import { type NextPage } from "next";
import { useState } from "react";
import {
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
  Dropdown,
  DropdownButton,
} from "~/components";
import { LessonRow } from "~/components/tables";

import { api } from "~/utils/api";

type PickerOptions = "Basic" | "Conversational" | "Technical";

const Learn: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("Basic");

  return (
    <>
      <PageWrapper>
        <main>
          <PageTitle>Learn</PageTitle>
          <div className="flex flex-row place-content-between">
            <SegmentedPicker
              title="Choose category:"
              selectedOption={selectedCategory}
              options={["Basic", "Conversational", "Technical"]}
              didSelectOption={(o) => setSelectedCategory(o)}
            />
            <Dropdown
              id={"example-dropdown"}
              dataDropdownToggle={"example-dropdown"}
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
              <DropdownButton title="User" onClick={() => console.log("3")} />
            </Dropdown>
          </div>
          <Section title="Part 1. Part title...">
            <div className="space-0 flex flex-col divide-y">
              <LessonRow
                title="Lesson 1"
                description="Description."
                difficulty={0}
                state="done"
              />
              <LessonRow
                title="Lesson 2"
                description="Description."
                difficulty={1}
                state="inProgress"
              />
              <LessonRow
                title="Lesson 3"
                description="Description."
                difficulty={2}
                state="pending"
              />
            </div>
          </Section>
          <Section title="Part 2. Part title...">
            <div className="space-0 flex flex-col divide-y">
              <LessonRow
                title="Lesson 1"
                description="Description."
                difficulty={0}
                state="done"
              />
              <LessonRow
                title="Lesson 2"
                description="Description."
                difficulty={1}
                state="inProgress"
              />
              <LessonRow
                title="Lesson 3"
                description="Description."
                difficulty={2}
                state="pending"
              />
            </div>
          </Section>
        </main>
      </PageWrapper>
    </>
  );
};

export default Learn;
