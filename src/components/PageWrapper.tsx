import * as React from "react";
import NavBar from "./NavBar";

export interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper(props: PageWrapperProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-slate-50">
      <div className="w-screen shrink">
        <NavBar />
      </div>
      <div
        id="page-wrapper-overflow"
        className="p-auto w-full grow overflow-y-auto overflow-x-hidden py-16"
      >
        <div className="mx-auto max-w-screen-md">{props.children}</div>
      </div>
    </div>
  );
}

export default PageWrapper;
