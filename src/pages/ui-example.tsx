import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import {
  Button,
  Dropdown,
  DropdownButton,
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
} from "~/components";

type PickerOptions = "One" | "Two" | "Three";

const UIExample: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("One");

  return (
    <>
      <PageWrapper>
        <PageTitle editsTitle>Page Title</PageTitle>
        <div className="flex flex-row place-content-between">
          <SegmentedPicker
            title="Choose category:"
            selectedOption={selectedCategory}
            options={["One", "Two", "Three"]}
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
            <DropdownButton onClick={() => console.log("1")}>
              Date
            </DropdownButton>
            <DropdownButton onClick={() => console.log("2")}>
              Level
            </DropdownButton>
            <DropdownButton onClick={() => console.log("3")}>
              User
            </DropdownButton>
          </Dropdown>
        </div>
        <Button>Next</Button>
        <Section title="Part 1. Part title...">
          <div className="flex flex-col space-y-0 divide-y">
            <div className="flex content-center py-6">
              <span className="mx-auto">Row Placeholder 1...</span>
            </div>
            <div className="flex content-center py-6">
              <span className="mx-auto">Row Placeholder 2...</span>
            </div>
            <div className="flex content-center py-6">
              <span className="mx-auto">Row Placeholder 3...</span>
            </div>
          </div>
        </Section>
      </PageWrapper>
    </>
  );
};

export default UIExample;
