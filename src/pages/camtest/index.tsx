import { type NextPage } from "next";
import React from "react";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
//import { MediaRecorderErrorEvent, MediaRecorderDataAvailableEvent } from 'dom-mediacapture-record';

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

const Camtest: NextPage = () => {
  const [videoFormat, setVideoFormat] = useState<VideoFormat | undefined>(
    undefined
  );
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const webcamRef = useRef<Webcam>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordedAudioChunks, setRecordedAudioChunks] = useState<Blob[]>([]);


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
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        console.log("MediaRecorder has new data available");
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            const buffer = new Uint8Array(reader.result as ArrayBuffer);
            const blob = new Blob([buffer], {
              type: event.data.type,
            });
      
            const isAudio = event.data.type.startsWith("audio/");
            
            if (isAudio) {
              setRecordedAudioChunks((prevChunks) => [...prevChunks, blob]);
              console.log("Added chunk to audio");
            } else {
              setRecordedChunks((prevChunks) => [...prevChunks, blob]);
              console.log("Added chunk to video");
            }
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
    const recordedVideoBlob = new Blob(recordedChunks, {
      type: videoFormat?.mimeType,
    });
    const recordedAudioBlob = new Blob(recordedAudioChunks, {
      type: mediaRecorder?.mimeType || 'audio/webm', 
    });
  
    console.log("Created files");
  
    setRecordedVideoUrl(URL.createObjectURL(recordedVideoBlob));
    const recordedAudioUrl = URL.createObjectURL(recordedAudioBlob);
  
    setRecordedChunks([]);
    setRecordedAudioChunks([]);
  };

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
        </div>
      </PageWrapper>
    </>
  );
};

export default Camtest;
