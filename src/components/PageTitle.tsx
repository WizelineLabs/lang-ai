import * as React from "react";
import Head from "next/head";

export interface PageTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  editsTitle?: boolean;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <>
      <Head>
        {props.editsTitle && <title>{props.children} - LangAI</title>}
      </Head>
      <h1
        {...props}
        className={`text-4xl font-bold text-slate-950 ${props.className ?? ""}`}
      />
    </>
  );
}

export default PageTitle;
