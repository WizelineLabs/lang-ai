import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  

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

                <form>
                  <p className="mb-4 text-xl">Please login to your account</p>
                  
                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
                      id="exampleFormControlInput1"
                      placeholder="Username" />
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="text-xl pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-500 dark:peer-focus:text-primary"
                      >Username
                    </label>
                  </div>

                 
                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <input
                      type="password"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput11"
                      placeholder="Password" />
                    <label
                      htmlFor="exampleFormControlInput11"
                      className="text-xl pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-500 dark:peer-focus:text-primary"
                      >Password
                    </label>
                  </div>

                  
                  <div className="text-xl	 mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      style={{
                        background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}>
                      Log in
                    </button>

                    
                    <a href="#!">Forgot password?</a>
                  </div>

                 
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2 text-xl	">Don't have an account?</p>
                    <button
                      type="button"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-lg font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      data-te-ripple-init
                      data-te-ripple-color="light">
                      Register
                    </button>
                  </div>
                </form>
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
