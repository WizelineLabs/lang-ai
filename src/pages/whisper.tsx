import { useState } from "react";
import { type NextPage } from "next";
import PageWrapper from "~/components/PageWrapper";
import PageTitle from "~/components/PageTitle";

const WhisperView: NextPage = () => {
  return (
    <PageWrapper>
      <PageTitle editsTitle>Whisper Tests</PageTitle>
    </PageWrapper>
  );
};

export default WhisperView;
