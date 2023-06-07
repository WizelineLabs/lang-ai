import { type NextPage } from "next";
import { ChevronIcon, LinkButton, PageTitle, PageWrapper } from "~/components";
import { EnglishLevelSection } from "~/components/evaluations/EnglishLevelSection";
import { useSession } from "next-auth/react";

const Evaluations: NextPage = () => {
  const session = useSession();

  const UserPage = () => (
    <PageWrapper>
      <PageTitle editsTitle>Evaluations</PageTitle>
      <EnglishLevelSection showButton={false} />
      <div className="mt-8 flex flex-row space-x-8">
        <LinkButton
          className="flex-1 justify-center"
          icon={<ChevronIcon className="h-6" />}
          iconInRight
          href="/learn/evaluation/"
        >
          <div className="py-16">
            <span className="text-2xl">Start now</span>
          </div>
        </LinkButton>
        <LinkButton
          className="flex-1 justify-center"
          theme="secondary"
          icon={<ChevronIcon className="h-6" />}
          iconInRight
          href="/grades?category=evaluations"
        >
          <div className="py-16">
            <span className="text-2xl">See previous results</span>
          </div>
        </LinkButton>
      </div>
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
    return <ErrorPage />;
  }
  return <UserPage />;
};

export default Evaluations;
