import { type NextPage } from "next";
import Head from "next/head";
import NavBar from '~/components/NavBar'

import { api } from "~/utils/api";

const Grades: NextPage = () => {
  
    return (
      <>
        <NavBar></NavBar>
        <Head>
        </Head>
        <main>
            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
                Grades
            </h1>
        </main>
      </>
    );
  };
  
  export default Grades;