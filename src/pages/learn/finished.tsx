import { type NextPage } from "next";
import { PageTitle, PageWrapper, ChevronIcon, LinkButton } from "~/components";

const Finished: NextPage = () => {
  return (
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
};

export default Finished;
