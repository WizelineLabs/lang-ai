import React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const width = (props.value / props.max) * 100;

  return (
    <div className="rounded-full">
      <div
        {...props}
        className={
          "h-3 w-full rounded-full bg-slate-200 " + (props.className ?? "")
        }
      >
        <div
          className="h-full rounded-full bg-current text-xs"
          style={{
            minWidth: 12,
            width: `calc(${width}% + 12px)`,
            maxWidth: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};
