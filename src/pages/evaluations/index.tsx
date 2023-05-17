import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import {
  ChevronIcon,
  LinkButton,
  PageTitle,
  PageWrapper,
  Section,
} from "~/components";

const Evaluations: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <PageTitle editsTitle>Evaluations</PageTitle>
        <Section>
          <div className="flex flex-col justify-center space-y-3 p-12 align-middle">
            <h5 className="text-center text-2xl font-bold text-primary">
              Current English Level: <span className="text-secondary">B2</span>
            </h5>
            <span className="text-center text-sm text-secondary">
              You need a level of C1 to be admitted to Wizeline.
            </span>
          </div>
        </Section>
        <div className="mt-8 flex flex-row space-x-8">
          <LinkButton
            className="flex-1 justify-center"
            icon={<ChevronIcon className="h-6" />}
            iconInRight
            href="/camtest/"
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
