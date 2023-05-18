import { type NextPage } from "next";
import { useEffect, useState } from "react";
import {
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
  Dropdown,
  DropdownButton,
  Spinner,
} from "~/components";
import { LessonRow } from "~/components/tables";

import { api } from "~/utils/api";

type PickerOptions = "Basic" | "Conversational" | "Technical";

const Learn: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("Basic");

  const { data: tests, isLoading, error } = api.learn.getTests.useQuery();

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
          {tests && tests.length > 0 ? (
            <Section title="Part 1. Part title...">
              <div className="space-0 flex flex-col divide-y">
                {tests.map((test) => (
                  <LessonRow
                    key={test.id}
                    title={test.name}
                    description={test.description ?? ""}
                    difficulty={test.difficulty}
                    state="pending"
                    buttonHref={`/learn/${test.id}/`}
                  />
                ))}
              </div>
            </Section>
          ) : (
            <div className="mt-8 grid w-full justify-center py-16">
              <div hidden={!isLoading} className="mx-auto text-secondary">
                <Spinner />
              </div>
              <p
                hidden={isLoading}
                className="text-center text-sm text-secondary"
              >
                {error ? error.message : "No data to show."}
              </p>
            </div>
          )}
          {/* <Section title="Part 2. Part title...">
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
          </Section> */}
        </main>
      </PageWrapper>
    </>
  );
};

export default Learn;
