import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import Head from "next/head";
import {
  Button,
  ChevronIcon,
  LinkButton,
  PageTitle,
  PageWrapper,
  Section,
} from "~/components";
import { LessonRow } from "~/components/tables";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <Head>
          <title>LangAI</title>
        </Head>
        <PageTitle>Welcome back, Bismarck</PageTitle>
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

          <Section title="Exercises awaiting for completion">
            <div className="space-0 flex flex-col divide-y">
              <LessonRow
                title="Lesson 1"
                description="Description."
                difficulty={0}
                state="inProgress"
              />
              <LessonRow
                title="Lesson 2"
                description="Description."
                difficulty={1}
                state="inProgress"
              />
              <LessonRow
                title="Lesson 3"
                description="Description."
                difficulty={2}
                state="pending"
              />
            </div>
          </Section>
        </main>
      </PageWrapper>
    </>
  );
};

export default Dashboard;
