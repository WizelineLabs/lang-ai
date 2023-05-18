import * as React from "react";
import Button from "../Button";

function InstructionAudio() {
  const handleClick = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();
  };
  return (
    <>
      <h1>Press the following button and listen to the sentence.</h1>
      <Button onClick={handleClick}>Listen</Button>
    </>
  );
}

export default InstructionAudio;
