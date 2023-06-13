import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { Spinner } from "~/components";

const buttonClassName =
  "rounded-md px-3 py-2 text-base focus:outline-none focus:ring focus:ring-offset-0 shadow-sm inline-flex items-center align-middle gap-1.5";

type ButtonTheme = "primary" | "primary-inverted" | "secondary";

function getClassNameForTheme(theme: ButtonTheme, disabled: boolean) {
  switch (theme) {
    case "primary":
      return `${buttonClassName} bg-red-600 text-white font-medium focus:ring-red-600/50 border border-red-600 ${
        disabled ? "opacity-50" : "hover:bg-red-700 hover:text-gray-100"
      }`;
    case "primary-inverted":
      return `${buttonClassName} bg-white text-red-600 font-regular focus:ring-red-600/50 border border-slate-200 focus:border-red-600 ${
        disabled ? "opacity-50" : "hover:bg-slate-50 hover:text-red-700"
      }`;
    case "secondary":
      return `${buttonClassName} bg-white text-slate-700 font-regular focus:ring-slate-700/50 border border-slate-200 focus:border-slate-700 ${
        disabled ? "opacity-50" : "hover:bg-slate-50 hover:text-slate-900"
      }`;
  }
}

interface MainButtonProps {
  theme?: ButtonTheme;
  icon?: React.ReactNode;
  iconInRight?: boolean;
  isLoading?: boolean;
}

interface ButtonProps
  extends MainButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  const theme = props.theme ?? "primary";
  const disabled = props.disabled ?? false;
  return (
    <button
      {...props}
      className={`${buttonClassName} ${getClassNameForTheme(theme, disabled)} ${
        props.className ?? ""
      }`}
    >
      {props.isLoading && <Spinner size={5} className="mr-0.5" />}
      {!props.iconInRight && props.icon}
      <span>{props.children}</span>
      {props.iconInRight && props.icon}
    </button>
  );
}

export interface LinkButtonProps
  extends LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asAnchor?: boolean;
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
        className={`${buttonClassName} ${getClassNameForTheme(theme, false)} ${
          props.className ?? ""
        }`}
      >
        {props.isLoading && <Spinner size={5} className="mr-0.5" />}
        {!props.iconInRight && props.icon}
        <span>{props.children}</span>
        {props.iconInRight && props.icon}
      </a>
    );
  }
  return (
    <Link
      {...props}
      className={`${buttonClassName} ${getClassNameForTheme(theme, false)} ${
        props.className ?? ""
      }`}
    >
      {props.isLoading && <Spinner size={5} className="mr-0.5" />}
      {!props.iconInRight && props.icon}
      <span>{props.children}</span>
      {props.iconInRight && props.icon}
    </Link>
  );
}

import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface ChevronIconProps {
  className?: string;
  additionalClassName?: string;
}

export function ChevronIcon(props: ChevronIconProps) {
  return (
    <ChevronRightIcon
      className={
        (props.className ?? "-mx-1 h-5") +
        (props.additionalClassName ? ` ${props.additionalClassName}` : "")
      }
      strokeWidth={2}
      aria-hidden
    />
  );
}

interface RecordingButtonProps {
  isRecording: boolean;
  text?: string;
  onClick: () => void;
}

export function RecordingButton(props: RecordingButtonProps) {
  const { isRecording, text, onClick } = props;
  return (
    <div className="flex rounded-full border bg-white shadow-sm">
      <button
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-red-500 hover:bg-slate-100 hover:text-red-700"
        onClick={() => onClick()}
      >
        <div
          className={
            "absolute h-6 w-6 bg-current " +
            (isRecording ? "rounded" : "rounded-full")
          }
        />
      </button>
      {text && (
        <span className="my-auto ml-2 mr-5 text-base text-secondary">
          {text}
        </span>
      )}
    </div>
  );
}

import { VideoCameraIcon } from "@heroicons/react/24/solid";

interface CameraButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
}

export function CameraButton(props: CameraButtonProps) {
  const { children, onClick } = props;
  return (
    <div className="flex rounded-full border bg-white shadow-sm">
      <button
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-red-500 hover:bg-slate-100 hover:text-red-700"
        onClick={() => onClick()}
      >
        <VideoCameraIcon className="h-8 w-8" />
      </button>
      {children}
    </div>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  onClick: () => void;
}

export function IconButton(props: IconButtonProps) {
  const { icon, children, onClick } = props;
  return (
    <div className="flex rounded-full border bg-white shadow-sm">
      <button
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-red-500 hover:bg-slate-100 hover:text-red-700"
        onClick={() => onClick()}
      >
        {icon}
      </button>
      {children}
    </div>
  );
}
