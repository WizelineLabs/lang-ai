import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";
import { Spinner } from "~/components";
import { LessonRow } from "~/components/tables";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const session = useSession();

  const { data: tests, isLoading, error } = api.learn.getTests.useQuery();

  return (
    <>
      <PageWrapper>
        <PageTitle>
          Welcome back, {session.data?.user.name ?? "Administrator"}
        </PageTitle>
        <main>
          <Section title="Latest user feedback">
            <p className="p-3 font-normal text-gray-700 dark:text-gray-500">
              User: Bizmarck Lepe
            </p>

            <p className="p-3 font-normal text-gray-700 dark:text-gray-500">
              Bizmarcks C2 English is impressive, but diversifying vocabulary
              and sentence structures can further enhance his communication
              skills.
            </p>
          </Section>

          {tests && tests.length > 0 ? (
            <Section title="Exercises completed recently">
              <div className="space-0 flex flex-col divide-y">
                {tests.map((test) => (
                  <LessonRow
                    key={test.id}
                    title={test.name}
                    description={test.description ?? ""}
                    difficulty={test.difficulty}
                    state="pending"
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
    </>
  );
};

export default Dashboard;
