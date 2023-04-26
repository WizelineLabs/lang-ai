import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";

const Finished: NextPage = () => {
  return (
    <PageWrapper>
      <div className="grid place-items-center">
        <PageTitle>You've Finished!</PageTitle>
        <h2 className="text-slate-500">
          Your results will be available shortly
        </h2>
      </div>
      <br />
      <div className="grid place-items-center">
        <div className="my-auto flex flex-row space-x-10">
          <a href="/learn">
            <Button>Return to Learn</Button>
          </a>
          <a href="/grades">
            <Button>See Your Grades</Button>
          </a>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Finished;
