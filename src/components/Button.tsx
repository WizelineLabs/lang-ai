import * as React from "react";
import Link, { type LinkProps } from "next/link";

const buttonClassName =
  "rounded-md px-3 py-2 text-base tracking-wide focus:outline-none focus:ring focus:ring-offset-0 shadow-sm inline-flex items-center align-middle gap-1.5";

type ButtonTheme = "primary" | "primary-inverted" | "secondary";

function getClassNameForTheme(theme: ButtonTheme) {
  switch (theme) {
    case "primary":
      return `${buttonClassName} bg-red-600 hover:bg-red-700 text-white hover:text-gray-100 font-medium focus:ring-red-600/50 border border-red-600`;
    case "primary-inverted":
      return `${buttonClassName} bg-white hover:bg-slate-50 text-red-600 hover:text-red-700 font-regular focus:ring-red-600/50 border border-slate-200`;
    case "secondary":
      return `${buttonClassName} bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-regular focus:ring-slate-700/50 border border-slate-200`;
  }
}

interface MainButtonProps {
  theme?: ButtonTheme;
  icon?: React.ReactNode;
  iconInRight?: boolean;
}

interface ButtonProps
  extends MainButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  const theme = props.theme ?? "primary";
  return (
    <button
      {...props}
      className={`${buttonClassName} ${getClassNameForTheme(theme)} ${
        props.className ?? ""
      }`}
    >
      {!props.iconInRight && props.icon}
      <span>{props.children}</span>
      {props.iconInRight && props.icon}
    </button>
  );
}

export default Button;

export interface LinkButtonProps
  extends MainButtonProps,
    LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asAnchor?: boolean;
}

export function LinkButton(props: LinkButtonProps) {
  const theme = props.theme ?? "primary";
  if (props.asAnchor) {
    return (
      <a
        {...props}
        className={`${buttonClassName} ${getClassNameForTheme(theme)} ${
          props.className ?? ""
        }`}
      >
        {!props.iconInRight && props.icon}
        <span>{props.children}</span>
        {props.iconInRight && props.icon}
      </a>
    );
  }
  return (
    <Link
      {...props}
      className={`${buttonClassName} ${getClassNameForTheme(theme)} ${
        props.className ?? ""
      }`}
    >
      {!props.iconInRight && props.icon}
      <span>{props.children}</span>
      {props.iconInRight && props.icon}
    </Link>
  );
}

import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function ChevronIcon() {
  return <ChevronRightIcon className="-mx-1 h-5" strokeWidth={2} aria-hidden />;
}
