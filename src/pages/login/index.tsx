import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  

    if(sessionData){
      //redirect to homepage
      router.push({
        pathname: "/dashboard",
      });
    }
  
  

  return (
    <>

      <main>
      
      
       
          <div className="g-0 lg:flex lg:flex-wrap h-screen " >
            
            <div className="lg:w-6/12">
              <div className="mx-6 p-12">
                
                <div className="text-center">
                  <br /><br /><br /><br /><br /><br /><br />
                  <img
                    className="mx-auto w-80"
                    src="/wizeline-light.svg"
                    alt="Wizeline"
                    width={207.5}
                    height={36}
                     />
               <h4 className="mb-12 mt-1 pb-1 text-2xl font-semibold">
                    We are Lang-AI Team
                  </h4>
                </div>

              
                <p className="mb-4 text-2xl	 text-center">Please sign in to your account</p>
                <br /><br />


                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  data-te-ripple-color="light"
                  style={{
                    background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                    }}
                  onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                  {sessionData ? "Sign out" : "Sign in"}
              </button>
              </div>
            </div>
                  
            <div
              className="flex items-center  lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
              style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}>
              <div className="px-4 py-6 text-white mx-6 p-12">
                <h4 className="mb-6 text-4xl font-semibold">
                  Lang-AI
                  English Assessment Tool
                </h4>
                <p className="text-2xl">
                 Welcome! Here you are going to learn, practice and evaluate your English. Feel free to navigate and use our webpage.
        
                </p>
              </div>
            </div>
          </div>
        
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
   
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
