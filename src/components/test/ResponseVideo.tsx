import * as React from "react";
import Button from "~/components/Button";
import Section from "~/components/Section";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

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

function ResponseVideo() {
  const [videoFormat, setVideoFormat] = useState<VideoFormat | undefined>(
    undefined
  );
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const webcamRef = useRef<Webcam>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

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
            const blob = new Blob([buffer], {
              type: videoCodec,
            });

            // Add the recorded data to the recordedChunks state variable
            setRecordedChunks((prevChunks) => [...prevChunks, blob]);
            console.log("Added chunk to video");
          };
          reader.readAsArrayBuffer(event.data);
        }
      };

      // Start recording
      mediaRecorder.start();
    } else {
      console.log("Will stop recording");
      // Stop recording
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  const concatenateRecordedChunks = () => {
    const recordedBlob = new Blob(recordedChunks, {
      type: videoFormat?.mimeType,
    });
    console.log("Created file");
    setRecordedVideoUrl(URL.createObjectURL(recordedBlob));
    setRecordedChunks([]);
  };
  return (
    <>
      <Webcam
        className="aspect-video w-full rounded-lg border bg-black"
        videoConstraints={videoConstraints}
        muted={true}
        audio={true}
        mirrored={true}
        ref={webcamRef}
      />

      <Section>
        <div className="flex flex-row justify-between p-5">
          <Button onClick={() => handleRecord()}>
            {mediaRecorder ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button
            onClick={() => concatenateRecordedChunks()}
            hidden={
              !!mediaRecorder ||
              !!recordedVideoUrl ||
              recordedChunks.length === 0
            }
          >
            Create file for download
          </Button>
          <a
            className="mx-3 my-auto"
            href={recordedVideoUrl ?? undefined}
            download={"WebcamTest." + (videoFormat?.ext ?? "mp4")}
            hidden={!recordedVideoUrl}
          >
            Download
          </a>
        </div>
      </Section>
      {recordedVideoUrl && (
        <video className="w-full" controls>
          <source src={recordedVideoUrl} type={videoFormat?.mimeType} />
        </video>
      )}

      <Section>
        <div style={{ width: "75%", float: "left" }}>
          <div style={{ width: "50%", float: "left", padding: 20 }}>
            <Button>Record</Button> {/* Remplazar boton por icono record*/}
          </div>
          <div style={{ width: "45%", float: "right", padding: 20 }}>
            <Button>Volumen</Button>
          </div>
        </div>
        <div style={{ width: "15%", float: "right", padding: 20 }}>
          <Button>Redo</Button>
          {/* Remplazar boton por icono redo*/}
        </div>
      </Section>
    </>
  );
}

export default ResponseVideo;
