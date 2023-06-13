import * as React from "react";
import Button, { IconButton } from "./Button";
import { ProgressBar } from "./ProgressBar";

import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

interface AudioPlayerProps {
  audioUrl: string;
}

function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    const audio = audioRef.current;

    if (audio) {
      if (!isPlaying) {
        audio.play().finally(() => console.log("Audio playing"));
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
    <>
      <IconButton
        icon={
          isPlaying ? (
            <PauseIcon className="h-8 w-8" />
          ) : (
            <PlayIcon className="h-8 w-8" />
          )
        }
        onClick={handleClick}
      >
        <div className="flex items-center pl-3 pr-4">
          <ProgressBar
            className="rounded-full"
            value={progress}
            max={100}
            style={{ width: "300px" }}
          />
        </div>
      </IconButton>
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} />
    </>
  );
}

export default AudioPlayer;
