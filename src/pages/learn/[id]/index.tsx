import { type GetServerSideProps, type NextPage } from "next";
import { getSession } from "next-auth/react";

const TestIndex: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps<
  { [key: string]: any },
  { id: string }
  // eslint-disable-next-line @typescript-eslint/require-await
> = async (context) => {
  const id = context.params?.id ?? "";
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If the user is logged in, continue rendering the page
  return {
    redirect: {
      destination: "/learn/" + id + "/camtest",
      permanent: false,
    },
  };
};

export default TestIndex;
