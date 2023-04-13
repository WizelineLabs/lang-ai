import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import SegmentedPicker from "~/components/SegmentedPicker";
import Section from "~/components/Section";
import { Dropdown, DropdownButton } from "~/components/Dropdown";

type PickerOptions = "One" | "Two" | "Three";

const UIExample: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("One");

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


        <Section title="">
          <br />
          <br />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 dark:text-white ">
                      <h1 className="inline-flex items-center justify-center bg-green-800 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em]">100</h1>
                    </th>
                    <td className="px-6 py-4 ">
                      <h1 className="dark:text-white">Lesson Title</h1>
                      <p>Lesson Description</p>
                    </td>
                    <td className="px-6 py-4 dark:text">Completed on: Feb 21, 2023 6:45pm</td>
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
                  <th
                      scope="row"
                      className="px-6 py-4 dark:text-white ">
                      <h1 className="inline-flex items-center justify-center bg-green-800 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em]">95</h1>
                    </th>
                    <td className="px-6 py-4 ">
                      <h1 className="dark:text-white">Lesson Title</h1>
                      <p>Lesson Description</p>
                    </td>
                    <td className="px-6 py-4 dark:text">Completed on: Feb 21, 2023 6:45pm</td>
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
                  <th
                      scope="row"
                      className="px-6 py-4 dark:text-white ">
                      <h1 className="inline-flex items-center justify-center bg-amber-400 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em]">55</h1>
                    </th>
                    <td className="px-6 py-4 ">
                      <h1 className="dark:text-white">Lesson Title</h1>
                      <p>Lesson Description</p>
                    </td>
                    <td className="px-6 py-4 dark:text">Completed on: Feb 21, 2023 6:45pm</td>
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
                  <th
                      scope="row"
                      className="px-6 py-4 dark:text-white ">
                      <h1 className="inline-flex items-center justify-center bg-red-500 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em]">30</h1>
                    </th>
                    <td className="px-6 py-4 ">
                      <h1 className="dark:text-white">Lesson Title</h1>
                      <p>Lesson Description</p>
                    </td>
                    <td className="px-6 py-4 dark:text">Completed on: Feb 21, 2023 6:45pm</td>
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
                  <th
                      scope="row"
                      className="px-6 py-4 dark:text-white ">
                      <h1 className="inline-flex items-center justify-center bg-amber-400 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em]">69</h1>
                    </th>
                    <td className="px-6 py-4 ">
                      <h1 className="dark:text-white">Lesson Title</h1>
                      <p>Lesson Description</p>
                    </td>
                    <td className="px-6 py-4 dark:text">Completed on: Feb 21, 2023 6:45pm</td>
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
                  <th
                      scope="row"
                      className="px-6 py-4 dark:text-white ">
                      <h1 className="inline-flex items-center justify-center bg-green-800 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em]">100</h1>
                    </th>
                    <td className="px-6 py-4 ">
                      <h1 className="dark:text-white">Lesson Title</h1>
                      <p>Lesson Description</p>
                    </td>
                    <td className="px-6 py-4 dark:text">Completed on: Feb 21, 2023 6:45pm</td>
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
      </PageWrapper>
    </>
  );
};

export default UIExample;
