import Button from "~/components/Button";
import Section from "~/components/Section";
import Webcam from "react-webcam";
import { useRef, useState, useCallback, useReducer, useEffect } from "react";
import { formatSecondsToTime } from "~/utils/formatSecondsToTime";
import { useTimer } from "~/hooks";
import { convertFileToBase64String } from "~/utils/fileToString";

const videoConstraints = {
  audio: true,
  video: true,
  width: 1280,
  height: 720,
  facingmode: "user",
};

type VideoFormat = {
  ext: string;
  mimeType: string;
  name: string;
};

const formats: VideoFormat[] = [
  { ext: "webm", mimeType: 'video/webm;codecs="vp9"', name: "VP9 (webm)" },
  { ext: "webm", mimeType: 'video/webm;codecs="vp8"', name: "VP8 (webm)" },
  { ext: "webm", mimeType: "video/webm;codecs=h264", name: "H.264 (webm)" },
  {
    ext: "mp4",
    mimeType: 'video/mp4;codecs="avc1.42E01E"',
    name: "H.264 (mp4)",
  },
];

const getVideoFormat = () => {
  for (const format of formats) {
    if (MediaRecorder.isTypeSupported(format.mimeType)) {
      console.log(`Codec ${format.name} will be used`);
      return format;
    }
  }
  console.error("No codecs supported by browser");
  return undefined;
};

interface ResponseVideoProps {
  didGetNewVideo?: (base64: string) => void;
}

function ResponseVideo(props: ResponseVideoProps) {
  const { didGetNewVideo } = props;

  const [videoFormat, setVideoFormat] = useState<VideoFormat | undefined>(
    undefined
  );
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const webcamRef = useRef<Webcam>(null);
  const [recordedChunks, setRecordedChunks] = useState<Uint8Array[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const currentTime = useTimer(!!mediaRecorder);

  // When the user stops recording, generate video file
  useEffect(() => {
    if (!mediaRecorder && recordedChunks.length > 0) {
      const concatenateRecordedChunks = () => {
        const recordedBlob = new Blob(recordedChunks, {
          type: videoFormat?.mimeType,
        });
        console.log("Created file");
        setRecordedVideoUrl(URL.createObjectURL(recordedBlob));
        setRecordedChunks([]);
        if (didGetNewVideo) {
          convertFileToBase64String(recordedBlob)
            .then((file) => {
              didGetNewVideo(file as string);
            })
            .catch((error) => console.error(error));
        }
      };
      // This way, the video will be generated only
      // when all changes to state have been applied
      concatenateRecordedChunks();
    }
  }, [mediaRecorder, recordedChunks, videoFormat, didGetNewVideo]);

  // Handler start/stop recording
  const handleRecord = () => {
    if (!mediaRecorder) {
      console.log("Will start recording");

      // Only continue if the webcam is being shown on the screen
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const stream = webcamRef.current?.stream;
      if (!stream) return;

      // Get video format for video file
      const videoFormat = getVideoFormat();
      const videoCodec = videoFormat?.mimeType;
      setVideoFormat(videoFormat);

      // Create a new MediaRecorder object with the desired settings
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: videoCodec,
        videoBitsPerSecond: 1500000, // 1500 kbps
        audioBitsPerSecond: 320000, // 320 kbps
      });
      setMediaRecorder(mediaRecorder);

      // Register event listener for the MediaRecorder object
      mediaRecorder.ondataavailable = (event) => {
        console.log("MediaRecorder has new data available");
        if (event.data.size > 0) {
          // Create a Uint8Array buffer from the Blob data
          const reader = new FileReader();
          reader.onload = () => {
            const buffer = new Uint8Array(reader.result as ArrayBuffer);
            // Add the recorded data to the recordedChunks state variable
            setRecordedChunks((prevChunks) => [...prevChunks, buffer]);
            console.log("Added chunk to video");
          };
          reader.readAsArrayBuffer(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Ensure the media recorder is deleted when it's actually finished
        setMediaRecorder(null);
      };

      // Start recording
      mediaRecorder.start();
    } else {
      console.log("Will stop recording");

      // Stop recording
      mediaRecorder.stop();
    }
  };

  const removeCurrentVideo = () => {
    if (recordedVideoUrl) {
      setRecordedVideoUrl(null);
      URL.revokeObjectURL(recordedVideoUrl);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-0 rounded-2xl border bg-white">
        {recordedVideoUrl ? (
          <video
            className="aspect-video w-full rounded-t-2xl bg-black"
            autoPlay
            controls
            preload="auto"
          >
            <source src={recordedVideoUrl} type={videoFormat?.mimeType} />
          </video>
        ) : (
          <Webcam
            className="aspect-video w-full rounded-t-2xl bg-black"
            videoConstraints={videoConstraints}
            muted={true}
            audio={true}
            mirrored={true}
            ref={webcamRef}
          />
        )}
        <div className="flex flex-row justify-between p-5">
          <span className="mx-3 my-auto text-base text-secondary">
            {formatSecondsToTime(currentTime)}
          </span>
          {recordedVideoUrl ? (
            <Button onClick={() => removeCurrentVideo()}>
              Record another video
            </Button>
          ) : (
            <Button onClick={() => handleRecord()}>
              {mediaRecorder ? "Stop Recording" : "Start Recording"}
            </Button>
          )}
          <a
            className="mx-3 my-auto"
            href={recordedVideoUrl ?? undefined}
            download={"WebcamTest." + (videoFormat?.ext ?? "mp4")}
            hidden={!recordedVideoUrl}
          >
            Download
          </a>
        </div>
      </div>
    </>
  );
}

export default ResponseVideo;
