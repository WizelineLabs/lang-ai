import * as React from "react";

interface InstructionTextProps {
  children: React.ReactNode;
}

function InstructionText(props: InstructionTextProps) {
  return (
    <>
      <h1>{props.children}</h1>
    </>
  );
}

export default InstructionText;
