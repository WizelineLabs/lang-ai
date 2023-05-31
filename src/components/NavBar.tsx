import * as React from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { api } from "~/utils/api";



interface NavBarLink {
  title: string;
  href: string;
}

const userOptions: NavBarLink[] = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Learn",
    href: "/learn",
  },
  {
    title: "Evaluations",
    href: "/evaluations",
  },
  {
    title: "Grades",
    href: "/grades",
  },
];

const adminOptions: NavBarLink[] = [
  {
    title: "Home",
    href: "/admin/dashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
];

type UserRole = "employee" | "administrator";
var userRole: UserRole = "employee"; // "employee" or "administrator" cambiar esto para cambiar navbar

function NavBar() {
  const session = useSession();
  //const { data: users, isLoading, error } = api.users.getUsers.useQuery();
  if( session.data?.user.name === "Humberto Rodriguez" && "Erick Padilla"){
    userRole = "administrator";
  }

  function didTapLogOut() {
    signOut({ callbackUrl: "/login" });

    console.log("Logged Out"); 
  }

  let options: NavBarLink[] = [];
  
  if (userRole === "employee") {
    options = userOptions;
  } else if (userRole === "administrator") {
    options = adminOptions;
  }

  return (
    <nav className="flex flex-row place-content-between border-b bg-white">
      <div className="mx-4 flex flex-row space-x-3">
        <Image
          className="my-2"
          src="/wizeline-light.svg"
          alt="Wizeline"
          width={207.5}
          height={36}
        />
        <span className="self-center text-3xl font-extrabold">LangAI</span>
      </div>
      <div className="mx-4 flex flex-row space-x-5">
        {options.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className="self-center text-base font-medium text-slate-500 hover:opacity-50"
          >
            {option.title}
          </Link>
        ))}
        <Menu as="div" className="relative self-center">
          <Menu.Button
            type="button"
            className="flex flex-row justify-center text-base font-medium text-slate-500 hover:opacity-50"
            id="dropdownNavBarUser"
            data-dropdown-toggle="dropdownUser"
          >
            <Image
              className="mr-2 rounded-full"
              src="/defaultuser.png"
              alt="Profile Picture"
              width={32}
              height={32}
            />
            <span className="inline-flex flex-row self-center">
              {session.data?.user.name ?? "Nadie"}

              <ChevronDownIcon
                className="-mr-1 h-6 w-6 text-slate-500"
                aria-hidden="true"
              />
            </span>
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2">
                <div className="text-sm text-slate-900">
                  {session.data?.user.name ?? "Nadie"}
                </div>
                <div className="truncate text-sm font-medium text-slate-600">
                  {session.data?.user.email ?? "Nadie"}
                </div>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active: hovered }) => (
                    <button
                      onClick={() => didTapLogOut()}
                      className={`${
                        hovered ? "bg-slate-100" : "bg-white text-gray-900"
                      } group flex w-full items-center px-3 py-2 text-sm text-slate-900`}
                    >
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}

export default NavBar;
