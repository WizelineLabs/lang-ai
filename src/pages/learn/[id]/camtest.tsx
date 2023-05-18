import { type NextPage } from "next";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import AlertContext from "~/contexts/AlertContext";

import { Button, ChevronIcon, PageTitle, PageWrapper } from "~/components";
import ResponseVideo from "~/components/test/ResponseVideo";

import { api } from "~/utils/api";
import { isRequestSuccess } from "~/server/models";

const Camtest: NextPage = () => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const testId = router.query.id?.toString() ?? "";

  const [forceLoading, setForceLoading] = useState(false);
  const mutation = api.test.prepareStartForTest.useMutation();
  const isLoading = mutation.isLoading || forceLoading;

  async function startTest() {
    try {
      setForceLoading(true);
      const result = await mutation.mutateAsync({ testId: testId });
      if (isRequestSuccess(result)) {
        await router.push(`/learn/${testId}/${result.value.id}`);
      } else {
        throw result.error;
      }
    } catch (e) {
      setForceLoading(false);
      const error = e as Error;
      console.error(error);
      showAlert(error.message);
    }
  }

  function didTapButton() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    startTest().finally(() => {});
  }

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
              <Button
                onClick={didTapButton}
                icon={<ChevronIcon />}
                iconInRight
                isLoading={isLoading}
                disabled={isLoading}
              >
                Next
              </Button>
            </div>
          </div>
          <ResponseVideo></ResponseVideo>
        </div>
      </PageWrapper>
    </>
  );
};

export default Camtest;
