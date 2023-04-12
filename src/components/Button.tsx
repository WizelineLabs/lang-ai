import * as React from "react";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-md bg-red-600 px-3 py-2 text-base font-medium tracking-wide text-white hover:bg-red-700 hover:text-gray-100 ${
        props.className ?? ""
      }`}
    >
      <span>{props.children}</span>
    </button>
  );
}

export default Button;
