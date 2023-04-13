import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import SegmentedPicker from "~/components/SegmentedPicker";
import Section from "~/components/Section";
import { Dropdown, DropdownButton } from "~/components/Dropdown";

const Evaluations: NextPage = () => {

  return (
    <>
      <PageWrapper>
      <PageTitle editsTitle>Evaluations</PageTitle>
      <br /><br />
      <div>
          <div className=" p-7 bg-white border border-gray-200 rounded-lg shadow :p-left">
              <br />
              <div className="flex space-x-2 text-right">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-dark">Current English level: </h5>
                
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-green-900">B2</h5>
              </div>
              <br />
  
            <p className="text-center mb-3 font-normal text-gray-700 dark:text-gray-400">You need a level of at least C1 to be admitted into Wizeline </p>
           
          </div>
      </div>
      <br /><br />

      <div className="flex space-x-20">
        <a href="/camtest" className="inline-flex items-center p-20 text-2xl text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Start now 
          <svg aria-hidden="true" className="  w-10 h-10 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </a>
        <a href="/grades" className="inline-flex items-center p-20 text-xl text-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          See previous results
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </a>
      </div>

      </PageWrapper>
    </>

  );
};

export default Evaluations;