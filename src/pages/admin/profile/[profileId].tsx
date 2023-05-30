import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";
import Image from "next/image";
import SegmentedPicker from "~/components/SegmentedPicker";
import { Dropdown, DropdownButton } from "~/components/Dropdown";

import { api } from "~/utils/api";



import { useRouter } from "next/router";

type PickerOptions = "Learn" | "Evaluations";

const Profile: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<PickerOptions>("Learn");

  const router = useRouter();

  const userId  = router.query.profileId?.toString() ?? ""; 
  const { data, isLoading, error } = api.users.getUserById.useQuery({
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
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 dark:text-white ">
                        <h1
                          className="inline-flex items-center justify-center rounded-full bg-green-800 px-[0.65em] pb-[0.25em] pt-[0.35em]"
                          style={{ color: "white" }}
                        >
                          100
                        </h1>
                      </th>
                      <td className="px-6 py-4 ">
                        <h1 className="dark:text-white">Lesson Title</h1>
                        <p>Employee Name</p>
                      </td>
                      <td className="dark:text px-6 py-4">
                        Completed on: Feb 21, 2023 6:45pm
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="/admin/evaluation"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          See details
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 dark:text-white ">
                        <h1
                          className="inline-flex items-center justify-center rounded-full bg-green-800 px-[0.65em] pb-[0.25em] pt-[0.35em]"
                          style={{ color: "white" }}
                        >
                          95
                        </h1>
                      </th>
                      <td className="px-6 py-4 ">
                        <h1 className="dark:text-white">Lesson Title</h1>
                        <p>Employee Name</p>
                      </td>
                      <td className="dark:text px-6 py-4">
                        Completed on: Feb 21, 2023 6:45pm
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          See details
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 dark:text-white ">
                        <h1
                          className="inline-flex items-center justify-center rounded-full bg-amber-400 px-[0.65em] pb-[0.25em] pt-[0.35em]"
                          style={{ color: "white" }}
                        >
                          55
                        </h1>
                      </th>
                      <td className="px-6 py-4 ">
                        <h1 className="dark:text-white">Lesson Title</h1>
                        <p>Employee Name</p>
                      </td>
                      <td className="dark:text px-6 py-4">
                        Completed on: Feb 21, 2023 6:45pm
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          See details
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 dark:text-white ">
                        <h1
                          className="inline-flex items-center justify-center rounded-full bg-red-500 px-[0.65em] pb-[0.25em] pt-[0.35em]"
                          style={{ color: "white" }}
                        >
                          30
                        </h1>
                      </th>
                      <td className="px-6 py-4 ">
                        <h1 className="dark:text-white">Lesson Title</h1>
                        <p>Employee Name</p>
                      </td>
                      <td className="dark:text px-6 py-4">
                        Completed on: Feb 21, 2023 6:45pm
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          See details
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 dark:text-white ">
                        <h1
                          className="inline-flex items-center justify-center rounded-full bg-amber-400 px-[0.65em] pb-[0.25em] pt-[0.35em]"
                          style={{ color: "white" }}
                        >
                          69
                        </h1>
                      </th>
                      <td className="px-6 py-4 ">
                        <h1 className="dark:text-white">Lesson Title</h1>
                        <p>Employee Name</p>
                      </td>
                      <td className="dark:text px-6 py-4">
                        Completed on: Feb 21, 2023 6:45pm
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          See details
                        </a>
                      </td>
                    </tr>
                    <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 dark:text-white ">
                        <h1
                          className="inline-flex items-center justify-center rounded-full bg-green-800 px-[0.65em] pb-[0.25em] pt-[0.35em]"
                          style={{ color: "white" }}
                        >
                          100
                        </h1>
                      </th>
                      <td className="px-6 py-4 ">
                        <h1 className="dark:text-white">Lesson Title</h1>
                        <p>Employee Name</p>
                      </td>
                      <td className="dark:text px-6 py-4">
                        Completed on: Feb 21, 2023 6:45pm
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          See details
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>
          </div>
        </main>
      </PageWrapper>
    </>
  );
};

export default Profile;