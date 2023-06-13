import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import {
  PageTitle,
  PageWrapper,
  Section,
  SegmentedPicker,
  Dropdown,
  DropdownButton,
  Spinner,
} from "~/components";
import { UsersRow } from "~/components/tables";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

type PickerOptions = "Name" | "Level";

const Users: NextPage = () => {
  const session = useSession();

  const [selectedCategory, setSelectedCategory] =
    useState<PickerOptions>("Name");

  const { data: users, isLoading, error } = api.users.getUsers.useQuery();

  const UsersPage = () => (
    <PageWrapper>
      <PageTitle editsTitle>Users</PageTitle>
      {/* <div className="flex flex-row place-content-between">
        <SegmentedPicker
          title="Choose category:"
          selectedOption={selectedCategory}
          options={["Name", "Level"]}
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
          <DropdownButton onClick={() => console.log("1")}>Date</DropdownButton>
          <DropdownButton onClick={() => console.log("2")}>
            Level
          </DropdownButton>
        </Dropdown>
      </div> */}
      {users && users.length > 0 ? (
        <Section title="">
          <div className="space-0 flex flex-col divide-y">
            {users.map((user) => (
              <UsersRow
                key={user.id}
                name={user.name ?? ""}
                buttonHref={`/admin/users/${user.id}/`}
                id={user.id}
                image={user.image}
              />
            ))}
          </div>
        </Section>
      ) : (
        <div className="mt-8 grid w-full justify-center py-16">
          <div hidden={!isLoading} className="mx-auto text-secondary">
            <Spinner />
          </div>
          <p hidden={isLoading} className="text-center text-sm text-secondary">
            {error ? error.message : "No data to show."}
          </p>
        </div>
      )}
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
    return <UsersPage />;
  }
  return <ErrorPage />;
};

export default Users;
