import { type NextPage } from "next";
import { ChevronIcon, LinkButton, PageTitle, PageWrapper } from "~/components";
import { EnglishLevelSection } from "~/components/evaluations/EnglishLevelSection";

const Evaluations: NextPage = () => {
  return (
    <>
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
    </>
  );
};

export default Evaluations;
