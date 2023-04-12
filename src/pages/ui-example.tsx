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
          <div className="flex flex-col space-y-0">
            <span className="mx-auto my-8">Rows go here...</span>
          </div>
        </Section>
      </PageWrapper>
    </>
  );
};

export default UIExample;
