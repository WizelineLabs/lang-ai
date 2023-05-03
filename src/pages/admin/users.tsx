import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import SegmentedPicker from "~/components/SegmentedPicker";
import Section from "~/components/Section";
import { Dropdown, DropdownButton } from "~/components/Dropdown";
import Image from "next/image";

type PickerOptions = "Name" | "Level" | "Last time Activity";

const Users: NextPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("Level");

  return (
    <>
      <PageWrapper>
        <PageTitle editsTitle>Users</PageTitle>
        <div className="flex flex-row place-content-between">
            <SegmentedPicker
              title="Choose category:"
              selectedOption={selectedCategory}
              options={["Name", "Level", "Last time Activity"]}
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

        <Section title="English Level: A2">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                      className="ml-3 rounded-full"
                      src="/bismarck.jpg"
                      alt="Profile Picture"
                      width={40}
                      height={40}
                    />               
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">Bismarck Lepe</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="/admin/grades"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile_2.jpg"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                      />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">James Jackson</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="/admin/grades"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile.png"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                    />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">Juan Lopez</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile_2.jpg"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                    />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">Marcos Quintero</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="English Level: B1">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile.png"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                      />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">James Jackson</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile.png"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                      />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">Marcos Quintero</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile.png"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                      />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">Juan Lopez</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
                    </a>
                  </td>
                </tr>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 dark:text-white ">
                    <Image
                        className="ml-3 rounded-full"
                        src="/dummy_profile.png"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                      />          
                  </th>
                  <td className="px-6 py-6 ">
                    <h1 className="dark:text-white">James Jackson</h1>
                  </td>
                  <td className="dark:text px-6 py-4">
                    Activity Completed on: Feb 21, 2023 6:45pm
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      See Profile
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

export default Users;
