import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <PageTitle>Welcome back, Bismarck</PageTitle>
        <main>
          <div>
            <Section>
              <div style={{ width: "75%", float: "left", padding: 20 }}>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Current English level: C2
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  You need a level of at least C1 to be admitted into Wizeline
                </p>
              </div>
              <div
                style={{
                  margin: "auto",
                  width: "25%",
                  float: "right",
                  padding: 10,
                }}
              >
                <br />
                <Button>Go to Evaluations</Button>
              </div>
            </Section>
          </div>

          <Section title="Latest feedback">
            <p
              className="font-normal text-gray-700 dark:text-gray-500"
              style={{ padding: "20px" }}
            >
              Your C2 English is impressive, but diversifying vocabulary and
              sentence structures can further enhance communication skills. Keep
              pushing yourself!
            </p>
          </Section>

          <Section title="Exercises awaiting for completion">
            <div className="mb-8 grid rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
              <figure className="flex flex-col items-center justify-center rounded-t-lg border-b border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800 md:rounded-t-none md:rounded-tl-lg md:border-r">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Lesson 1
                  </h3>
                  <p className="my-4">Basic English 1</p>
                </blockquote>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Resume
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </figure>
              <figure className="flex flex-col items-center justify-center rounded-tr-lg border-b border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Lesson 2
                  </h3>
                  <p className="my-4">Basic English 2</p>
                </blockquote>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </figure>
              <figure className="flex flex-col items-center justify-center rounded-bl-lg border-b border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800 md:border-b-0 md:border-r">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Lesson 3
                  </h3>
                  <p className="my-4">Intermediate English 1</p>
                </blockquote>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </figure>
              <figure className="flex flex-col items-center justify-center rounded-b-lg border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800 md:rounded-br-lg">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Lesson 4
                  </h3>
                  <p className="my-4">Intermediate English 2</p>
                </blockquote>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Start
                  <svg
                    aria-hidden="true"
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </figure>
            </div>
          </Section>
        </main>
      </PageWrapper>
    </>
  );
};

export default Dashboard;
