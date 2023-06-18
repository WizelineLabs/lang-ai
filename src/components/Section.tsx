import * as React from "react";
import { Spinner } from "./Spinner";

export interface SectionProps {
  title?: string;
  noBackground?: boolean;
  children: React.ReactNode;
}

export function Section({ title, children, noBackground }: SectionProps) {
  return (
    <div className="mt-8 flex flex-col space-y-2">
      {title && (
        <h2 className="mx-5 text-2xl font-bold text-slate-950">{title}</h2>
      )}
      <div className={noBackground ? "" : "rounded-2xl border bg-white"}>
        {children}
      </div>
    </div>
  );
}

export interface LoadingSectionProps {
  isLoading: boolean;
  error?: Error | null;
  defaultError?: string;
}

export function LoadingSection(props: LoadingSectionProps) {
  const { isLoading, error, defaultError } = props;
  return (
    <div className="mt-8 grid w-full justify-center py-16">
      <div hidden={!isLoading} className="mx-auto text-secondary">
        <Spinner />
      </div>
      <p hidden={isLoading} className="text-center text-sm text-secondary">
        {error ? error.message : defaultError ?? ""}
      </p>
    </div>
  );
}

export default Section;
