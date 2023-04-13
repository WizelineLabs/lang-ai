import * as React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";

export interface DropdownProps {
  id: string;
  dataDropdownToggle: string;
  menuButtonClassName?: string;
  menuButtonContent: React.ReactNode;
  children: React.ReactNode;
}

export function Dropdown({
  id,
  dataDropdownToggle,
  menuButtonClassName,
  menuButtonContent,
  children,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative self-center">
      <Menu.Button
        type="button"
        className={
          "inline-flex flex-row justify-center " +
          (menuButtonClassName ?? "hover:opacity-50")
        }
        id={id}
        data-dropdown-toggle={dataDropdownToggle}
      >
        {menuButtonContent}
        <ChevronDownIcon className="-mr-1 h-6 w-6" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export interface DropdownButtonProps {
  title: string;
  icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
}

export function DropdownButton({ title, icon, onClick }: DropdownButtonProps) {
  const ButtonIcon = icon;
  return (
    <div className="my-1">
      <Menu.Item>
        {({ active: hovered, disabled, close }) => (
          <button
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => onClick()}
            className={`${
              hovered ? "bg-slate-100" : "bg-white text-gray-900"
            } group flex w-full items-center px-3 py-2 text-sm text-slate-900`}
          >
            {(() => {
              if (ButtonIcon) {
                return (
                  <ButtonIcon
                    className="mr-2 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                );
              } else {
                return <></>;
              }
            })()}
            {title}
          </button>
        )}
      </Menu.Item>
    </div>
  );
}
