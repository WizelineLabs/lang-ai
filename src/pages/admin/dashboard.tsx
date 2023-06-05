import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";
import { Spinner } from "~/components";
import { AdminLessonRow } from "~/components/tables";
import { useSession } from "next-auth/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
          <Section title="Latest feedback">
            <div className="flex flex-col space-y-2 px-6 pb-4 pt-5">
              <p className="text-sm text-secondary">User: Bizmarck Lepe</p>
              <p className="text-sm text-secondary">
                Bizmarcks C2 English is impressive, but diversifying vocabulary
                and sentence structures can further enhance his communication
                skills.
              </p>
              <p className="text-right text-xs text-slate-400">
                <InformationCircleIcon className="mb-0.5 inline h-4" /> Powered
                by Wizeline AI
              </p>
            </div>
          </Section>

          {tests && tests.length > 0 ? (
            <Section title="Availible Exercises">
              <div className="space-0 flex flex-col divide-y">
                {tests.map((test) => (
                  <AdminLessonRow
                    key={test.id}
                    title={test.name}
                    description={test.description ?? ""}
                    difficulty={test.difficulty}
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
