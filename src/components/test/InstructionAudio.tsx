import * as React from "react";
import Button from "../Button";

interface InstructionAudioProps {
  audioUrl: string;
}

function InstructionAudio({ audioUrl }: InstructionAudioProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    const audio = audioRef.current;

    if (audio) {
      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (audio) {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const currentProgress = (currentTime / duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Press the following button and listen to the sentence.</h1>
      <br></br>
      <Button onClick={handleClick}>{isPlaying ? "Pause" : "Listen"}</Button><br></br>
      <br></br>
      <progress value={progress} max={100} style={{ width: "100%" }} />
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
}

export default InstructionAudio;