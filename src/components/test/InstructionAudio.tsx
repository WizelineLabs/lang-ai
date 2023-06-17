import AudioPlayer from "../AudioPlayer";
import { isRequestSuccess } from "~/server/models";

import { api } from "~/utils/api";

interface InstructionAudioProps {
  questionId: string;
}

function InstructionAudio(props: InstructionAudioProps) {
  const { questionId } = props;
  const { data } = api.test.getAudioURL.useQuery({ questionId: questionId });
  const url = data && isRequestSuccess(data) ? data.value.url : null;

  if (!url) {
    return <></>;
  }
  return (
    <>
      <p className="whitespace-pre-wrap break-words text-base leading-normal text-primary">
        Listen to the following audio:
      </p>
      <div className="flex items-center justify-center pb-3">
        <AudioPlayer audioUrl={url} />
      </div>
    </>
  );
}

export default InstructionAudio;
