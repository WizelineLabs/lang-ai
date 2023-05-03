import * as React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mt-8 flex flex-col space-y-2">
      {title && (
        <h2 className="mx-5 text-2xl font-bold text-slate-950">{title}</h2>
      )}
      <div className="border-red rounded-2xl border bg-white">{children}</div>
    </div>
  );
}

export default Section;
