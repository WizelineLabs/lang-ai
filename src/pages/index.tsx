import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import NavBar from "~/components/NavBar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({
    text: sessionData?.user.name ?? "Anonymous",
  });

  const router = useRouter();

  useEffect(() => {
    // Redirect logic goes here
    router.push("/login");
  }, []);

  return (
    <>
      <NavBar></NavBar>
    </>
  );
};

export default Home;
