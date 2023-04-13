import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import NavBar from "~/components/NavBar";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Section from "~/components/Section";
import SegmentedPicker from "~/components/SegmentedPicker";

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
          <SegmentedPicker
            title="Choose category:"
            selectedOption={selectedCategory}
            options={["Basic", "Conversational", "Technical"]}
            didSelectOption={(o) => setSelectedCategory(o)}
          />
          <Section title="Part 1. Part title...">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Start</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Lesson Title
                    </th>
                    <td className="px-6 py-4">Lesson Description</td>
                    <td className="px-6 py-4" style={{color: "green"}}>Easy</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Lesson Title
                    </th>
                    <td className="px-6 py-4">Lesson Description</td>
                    <td className="px-6 py-4" style={{color: "green"}}>Easy</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Lesson Title
                    </th>
                    <td className="px-6 py-4">Lesson Description</td>
                    <td className="px-6 py-4" style={{color: "green"}}>Easy</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>
          <Section title="Part 2. Part title...">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Start</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Lesson Title
                    </th>
                    <td className="px-6 py-4">Lesson Description</td>
                    <td className="px-6 py-4" style={{color: "#FFC300"}}>Medium</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Lesson Title
                    </th>
                    <td className="px-6 py-4">Lesson Description</td>
                    <td className="px-6 py-4" style={{color: "#FFC300"}}>Medium</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Lesson Title
                    </th>
                    <td className="px-6 py-4">Lesson Description</td>
                    <td className="px-6 py-4" style={{color: "red"}}>Hard</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Start
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>
        </main>
      </PageWrapper>
    </>
  );
};

export default Learn;
