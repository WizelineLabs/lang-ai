import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";

import Button from "~/components/Button";

import Image from "next/image";
import { GradesRow } from "~/components/tables";



import { api } from "~/utils/api";

import {
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
  Dropdown,
  DropdownButton,
  Spinner,
} from "~/components";



import { useRouter } from "next/router";

type PickerOptions = "Learn" | "Evaluations";

const Profile: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<PickerOptions>("Learn");

  const router = useRouter();
 //ola
  const userId  = router.query.profileId?.toString() ?? ""; 
  //const grades = router.query.grades?.toString() ?? "";
  const { data, isLoading, error } = api.users.getUserById.useQuery({
    userId: userId,
  });
  const { data: grades } = api.gradesUser.getGrades.useQuery({ 
    category: selectedCategory,
    userId: userId,
  
  });


  return (
    <>
      <PageWrapper>
        <main>
          <div>
            <Section>
              <div className="flex flex-row">
                <div className="basis-1/3">
                  <Image
                    className="my-3 ml-4 rounded-full"
                    src="/defaultuser.png"
                    alt="Profile Picture"
                    width={180}
                    height={180}
                  />
                </div>
                <div className="flex basis-2/3 items-center">
                  <h2 className="dark:text-dark pl-3 text-2xl font-bold tracking-tight text-gray-900">
                    {data?.name}
                  </h2>
                  {/* <h3 className="pl-4 font-normal text-gray-700 dark:text-gray-400">
                    Founder of Wizeline
                  </h3> */}
                </div>
              </div>
            </Section>
          </div>

          <div>
            <br />
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
                <DropdownButton
                  title="Level"
                  onClick={() => console.log("2")}
                />
              </Dropdown>
            </div>

            <Section>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {grades && grades.length > 0 ? (
                  <Section>
                    <div className="space-0 flex flex-col divide-y">
                      {grades.map((userTest) => (
                        <GradesRow
                          title={userTest?.test.name ?? "Untitled"}
                          description={userTest?.test.description ?? ""}
                          date={userTest?.submissionDate ?? new Date()}
                          grade={Number(userTest?.score)}
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
              </div>
            </Section>
          </div>
        </main>
      </PageWrapper>
    </>
  );
};

export default Profile;
