import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import {
  ChevronIcon,
  LinkButton,
  PageTitle,
  PageWrapper,
  Section,
  Spinner,
} from "~/components";
import { LessonRow } from "~/components/tables";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const session = useSession();
  const { data: tests, isLoading, error } = api.learn.getTests.useQuery();

  return (
    <>
      <PageWrapper>
        <Head>
          <title>LangAI</title>
        </Head>


        <PageTitle>Welcome back, {session.data?.user.name ?? "Nadie"}</PageTitle>


        
        <main>
          <div>
            <Section>
              <div className="flex flex-row">
                <div className="flex grow flex-col justify-center space-y-3 px-8 py-12 align-middle">
                  <h5 className="text-center text-2xl font-bold text-primary">
                    Current English Level:{" "}
                    <span className="text-emerald-600">C1</span>
                  </h5>
                  <span className="text-center text-sm text-secondary">
                    You need a level of C1 to be admitted to Wizeline.
                  </span>
                </div>
                <LinkButton
                  className="my-auto mr-9"
                  icon={<ChevronIcon />}
                  iconInRight
                  href="/evaluations/"
                >
                  Go to Evaluations
                </LinkButton>
              </div>
            </Section>
          </div>

          <Section title="Latest feedback">
            <div className="flex flex-col space-y-2 px-6 pb-4 pt-5">
              <p className="text-sm text-secondary">
                Your C2 English is impressive, but diversifying vocabulary and
                sentence structures can further enhance communication skills.
                Keep pushing yourself!
              </p>
              <p className="text-right text-xs text-slate-400">
                <InformationCircleIcon className="mb-0.5 inline h-4" /> Powered
                by Wizeline AI
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
