import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  ChevronIcon,
  LinkButton,
  PageTitle,
  PageWrapper,
  Section,
  Spinner,
} from "~/components";
import { LessonRow } from "~/components/tables";
import { queryChatGPTChat, queryChatGPTCompletion } from "~/services/openai/chatgpt";
import { api } from "~/utils/api";




const Dashboard: NextPage = () => {
  const [response, setResponse] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(true);
  const { data: tests, isLoading, error } = api.learn.getTests.useQuery();
  const session  = useSession();

  useEffect(() => {
    async function fetchFeedbackTxt() {
      try {
        const completionResponse = await queryChatGPTCompletion(
          "You are an English evaluator, give me a very short feedback (50 words or less) on a user who is currently at C1 level of English and is having trouble in the listening section."
        );

        const generatedText = completionResponse.choices[0]?.text ?? "";

        setResponse(generatedText);
        setIsLoadingResponse(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoadingResponse(false); // Update loading state in case of error
      }
    }

    fetchFeedbackTxt();
  }, []);

  const AdminPage = () => (
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
            Bizmarcks C2 English is impressive, but diversifying vocabulary and
            sentence structures can further enhance his communication skills.
          </p>
        </Section>

        {tests && tests.length > 0 ? (
          <Section title="Exercises Availible for Employees">
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
  );

  const UserPage = () => (

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

      {isLoadingResponse ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <Section title="Latest feedback">
          <div className="flex flex-col space-y-2 px-6 pb-4 pt-5">
            <p className="text-sm text-secondary">{response}</p>
            <p className="text-right text-xs text-slate-400">
              <InformationCircleIcon className="mb-0.5 inline h-4" /> Powered by Wizeline AI
            </p>
          </div>
        </Section>
      )}

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
  );

  if (session.data?.user.isAdmin) {
    return <AdminPage />;
  }
  return <UserPage />;
};

export default Dashboard;
