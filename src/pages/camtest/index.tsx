import { type NextPage } from "next";
import React from "react";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import ResponseVideo from "~/components/test/ResponseVideo";
import Link from "next/link";
//import { MediaRecorderErrorEvent, MediaRecorderDataAvailableEvent } from 'dom-mediacapture-record';

const Camtest: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Webcam Test</PageTitle>
              <h2 style={{ paddingTop: 10, color: "GrayText" }}>
                Check your audio and video devices
              </h2>
            </div>

            <div className="my-auto flex flex-row space-x-3">
              <Link href="/exercise">
                <Button>Next</Button>
              </Link>
            </div>
          </div>

          <ResponseVideo></ResponseVideo>
        </div>
      </PageWrapper>
    </>
  );
};

export default Camtest;
