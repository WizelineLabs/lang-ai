import { type NextPage } from "next";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";
import Webcam from "react-webcam";
import ResponseVideo from "~/components/test/ResponseVideo";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";

import { api } from "~/utils/api";
import InstructionText from "~/components/test/InstructionTextProps";

const Exercise: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Lesson Title</PageTitle>
            </div>

            <div className="my-auto flex flex-row space-x-5">
              <h2 className="py-3 font-sans">1 of 10</h2>
              <Button>Previous</Button>

              <Button>Next</Button>
            </div>
          </div>
          <Section>
            <div className="px-4 py-3">
              <InstructionText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </InstructionText>
            </div>
          </Section>
          <br />
          <ResponseVideo />
        </div>
      </PageWrapper>
    </>
  );
};

export default Exercise;
