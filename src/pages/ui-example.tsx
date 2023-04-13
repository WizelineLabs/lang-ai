import { useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import SegmentedPicker from "~/components/SegmentedPicker";
import Section from "~/components/Section";

type PickerOptions = "One" | "Two" | "Three";

const UIExample: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("One");

  return (
    <>
      <PageWrapper>
        <PageTitle editsTitle>Page Title</PageTitle>
        <SegmentedPicker
          title="Choose category:"
          selectedOption={selectedCategory}
          options={["One", "Two", "Three"]}
          didSelectOption={(o) => setSelectedCategory(o)}
        />
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
