import * as React from "react";
import Link, { LinkProps } from "next/link";

const buttonClassName =
  "rounded-md bg-red-600 px-3 py-2 text-base font-medium tracking-wide text-white hover:bg-red-700 hover:text-gray-100 focus:outline-none focus:ring focus:ring-red-600/50 focus:ring-offset-0";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${buttonClassName} ${props.className ?? ""}`}
    >
      <span>{props.children}</span>
    </button>
  );
}

export interface LinkButtonProps
  extends LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asAnchor?: boolean;
}

export function LinkButton(props: LinkButtonProps) {
  if (props.asAnchor) {
    return (
      <a
        {...props}
        className={`${buttonClassName} py-2.5 ${props.className ?? ""}`}
      >
        <span>{props.children}</span>
      </a>
    );
  }
  return (
    <Link
      {...props}
      className={`${buttonClassName} py-2.5 ${props.className ?? ""}`}
    >
      <span>{props.children}</span>
    </Link>
  );
}

export default Button;
