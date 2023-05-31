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
import InstructionText from "~/components/test/InstructionText";

const Exercise: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Speaking Exercise</PageTitle>
            </div>

            <div className="my-auto flex flex-row space-x-5">
              <h2 className="py-3 font-sans">1 of 10</h2>

              <Button>Next</Button>
            </div>
          </div>
          <Section>
            <div className="px-4 py-3">
              <a className="font-bold">
                Read and record yourself speaking the following text:{" "}
              </a>

              <InstructionText>
                Opera refers to a dramatic art form, originating in Europe, in
                which the emotional content is conveyed to the audience as much
                through music, both vocal and instrumental, as it is through the
                lyrics. By contrast, in musical theater an actor's dramatic
                performance is primary, and the music plays a lesser role. The
                drama in opera is presented using the primary elements of
                theater such as scenery, costumes, and acting. However, the
                words of the opera, or libretto, are sung rather than spoken.
                The singers are accompanied by a musical ensemble ranging from a
                small instrumental ensemble to a full symphonic orchestra.
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
