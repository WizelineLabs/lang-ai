import { type NextPage } from "next";
import React from "react";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";
import Webcam from "react-webcam"
import { useRef,useState, useCallback } from "react";
//import { MediaRecorderErrorEvent, MediaRecorderDataAvailableEvent } from 'dom-mediacapture-record';


const videoConstraints = {
  audio: true,
  video: true,
  width: 720,
  height: 360,
  facingmode: "user"
}


const Camtest: NextPage = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const webcamRef = useRef<Webcam>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(
    null
  );

  const handleRecord = () => {
    if (!mediaRecorder) {
      // Create a new MediaRecorder object with the desired settings
      const stream = webcamRef.current?.stream;
      if (!stream) {
        return;
      }
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9,opus",
        audioBitsPerSecond: 128000
      });
      setMediaRecorder(mediaRecorder);

      // Register event listener for the MediaRecorder object
      mediaRecorder.addEventListener("dataavailable", (event: any) => {
        if (event.data.size > 0) {
          // Create a Uint8Array buffer from the Blob data
          const reader = new FileReader();
          reader.onload = () => {
            const buffer = new Uint8Array(reader.result as ArrayBuffer);
            const blob = new Blob([buffer], { type: "video/webm;codecs=vp9,opus" });

            // Add the recorded data to the recordedChunks state variable
            setRecordedChunks((prevChunks) => [...prevChunks, blob]);
          };
          reader.readAsArrayBuffer(event.data);
        }
      });

      // Start recording
      mediaRecorder.start();
    } else {
      // Stop recording
      mediaRecorder.stop();
      setMediaRecorder(null);
      concatenateRecordedChunks();
    }
  };

  const concatenateRecordedChunks = () => {
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm;codecs=vp9,opus" });
    setRecordedVideoUrl(URL.createObjectURL(recordedBlob));
    setRecordedChunks([]);
  };

  
  
  
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Webcam Test</PageTitle>
              <h2 style={{ paddingTop: 10, color: "GrayText" }}>
                Check your audio and video devices
              </h2>
            </div>

            <div className="my-auto flex flex-row space-x-3">
              <a href="/exercise">
                <Button>Next</Button>
              </a>
            </div>
          </div>

          <br />
          <div>
          <Webcam videoConstraints={videoConstraints} ref={webcamRef}/>
          </div>
         
          <Section>
            <div style={{ width: "75%", float: "left" }}>
              <div style={{ width: "50%", float: "left", padding: 20 }}>
                <button onClick={handleRecord}>
                {mediaRecorder ? 'Stop Recording' : 'Start Recording'}
                </button>                
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
        </div>
        <br>
        </br>
        <div style={{float: "left", padding: 100}}>
          {recordedChunks.length > 0 && (
            <button onClick={concatenateRecordedChunks} style={{float: "left", paddingLeft: 250}}>See results</button>
          )}
          {recordedVideoUrl && (
            <video controls src={recordedVideoUrl} />
          )}
        </div>
      </PageWrapper>
    </>
  );
};
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default Camtest;
