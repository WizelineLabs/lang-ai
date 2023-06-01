import * as React from "react";

interface InstructionTextProps {
  children: React.ReactNode;
}

function InstructionText(props: InstructionTextProps) {
  if (typeof props.children === "string") {
    const lines = props.children.split("\n");
    return (
      <>
        <div className="flex flex-col gap-3">
          {lines.map((line) => (
            <p
              key={line}
              className="whitespace-pre-wrap break-words text-base leading-normal text-primary"
            >
              {line}
            </p>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <p className="whitespace-pre-wrap break-words text-base leading-normal text-primary">
        {props.children}
      </p>
    </>
  );
}

export default InstructionText;
