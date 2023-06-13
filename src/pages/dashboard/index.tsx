import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { PageTitle, PageWrapper, Section, Spinner } from "~/components";
import { EnglishLevelSection } from "~/components/evaluations/EnglishLevelSection";
import { AdminLessonRow } from "~/components/tables";
import { LessonRow } from "~/components/tables";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const session = useSession();
  const { data: tests, isLoading, error } = api.learn.getTests.useQuery();

  const AdminPage = () => (
    <PageWrapper>
      <PageTitle>
        Welcome back, {session.data?.user.name ?? "Administrator"}
      </PageTitle>
      <main>
        {tests && tests.length > 0 ? (
          <Section title="Exercises Available for Employees">
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
  );

  const UserPage = () => (
    <PageWrapper>
      <Head>
        <title>LangAI</title>
      </Head>

      <PageTitle>Welcome back, {session.data?.user.name ?? "Nadie"}</PageTitle>

      <EnglishLevelSection showButton />

      <Section title="Latest feedback">
        <div className="flex flex-col space-y-2 px-6 pb-4 pt-5">
          <p className="text-sm text-secondary">
            Your English is impressive, but diversifying vocabulary and sentence
            structures can further enhance communication skills. Keep pushing
            yourself!
          </p>
          <p className="text-right text-xs text-slate-400">
            <InformationCircleIcon className="mb-0.5 inline h-4" /> Powered by
            Wizeline AI
          </p>
        </div>
      </Section>

      {tests && tests.length > 0 ? (
        <Section title="Exercises awaiting for completion">
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
          <p hidden={isLoading} className="text-center text-sm text-secondary">
            {error ? error.message : "No data to show."}
          </p>
        </div>
      )}
    </PageWrapper>
  );

  if (session.data?.user.isAdmin) {
    return <AdminPage />;
  }
  return <UserPage />;
};

export default Dashboard;
