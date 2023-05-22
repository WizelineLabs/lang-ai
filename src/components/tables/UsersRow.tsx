import { Button, ChevronIcon, LinkButton } from "~/components";
import Image from "next/image";

export interface UsersRowProps {
  name: string;
  buttonHref?: string;
}

export function UsersRow(props: UsersRowProps) {
  const { name, buttonHref } = props;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 dark:text-white ">
              <Image
                className="ml-3 rounded-full"
                src="/defaultuser.png"
                alt="Profile Picture"
                width={40}
                height={40}
              />
            </th>
            <td className="px-6 py-6">{name}</td>
            <td className="px-6 py-4 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                See Profile
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UsersRow;
