import { type NextPage } from "next";
import { PageTitle, PageWrapper, ChevronIcon, LinkButton } from "~/components";
import { useSession } from "next-auth/react";

const Finished: NextPage = () => {
  const session = useSession();

  const FinishedPage = () => (
    <PageWrapper>
      <div className="flex flex-col justify-center gap-y-16 pt-16">
        <div className="flex flex-col gap-y-2">
          <PageTitle editsTitle className="text-center">
            You&apos;ve Finished!
          </PageTitle>
          <span className="text-center text-base text-secondary">
            Your results will be available shortly.
          </span>
        </div>
        <div className="mx-auto flex flex-row gap-x-16">
          <LinkButton
            theme="primary-inverted"
            icon={<ChevronIcon additionalClassName="-scale-x-100" />}
            href="/learn"
          >
            Return to Learn
          </LinkButton>
          <LinkButton
            theme="primary"
            icon={<ChevronIcon />}
            iconInRight
            href="/grades?category=learn"
          >
            See Your Grades
          </LinkButton>
        </div>
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
  return <FinishedPage />;
};

export default Finished;
