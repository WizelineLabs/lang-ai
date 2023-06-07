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
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

type PickerOptions = "Basic" | "Conversational" | "Technical";

const Learn: NextPage = () => {
  const session = useSession();
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("Basic");

  const { data: tests, isLoading, error } = api.learn.getTests.useQuery();

  const LearnPage = () => (
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
        {tests && tests.length > 0 ? (
          <Section>
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
      </main>
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
  return <LearnPage />;
};

export default Learn;
