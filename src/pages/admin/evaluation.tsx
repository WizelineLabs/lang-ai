import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Button from "~/components/Button";
import PageTitle from "~/components/PageTitle";
import Section from "~/components/Section";
import PageWrapper from "~/components/PageWrapper"

const Evaluation: NextPage = () => {

    return(
        <>
            <PageWrapper>
                <div className="flex flex-row place-content-between">
                    <PageTitle editsTitle>Evaluation Review</PageTitle>
                    <h2 className="flex items-center ml-24 pl-28">
                        1 of 10
                    </h2>
                    <Button className="mr-28">Next</Button>
                </div>

                <div className="grid grid-cols-3 pt-5">
                    <div className="pl-2.5">Exercise 1.Reading</div>
                    <div className="flex place-self-end mr-2.5">
                        <h3 className="">AI Score:</h3>
                        <h3 className="font-bold dark:text-green-900 pl-1">92</h3>
                    </div>
                    <div>
                        Your Score:
                    </div>
                </div>

                <Section>
                    <div className="px-4 py-3">
                        <h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias vitae perspiciatis ratione omnis aperiam veritatis sed quisquam placeat obcaecati nemo est ipsum, alias odio hic rem quaerat rerum ea quidem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, architecto laborum asperiores adipisci rem minus distinctio praesentium blanditiis ad, corrupti veniam. Unde deleniti quo suscipit iusto quaerat in nam nobis.
                            lore
                        </h1>   
                    </div>
                </Section>

                <br />
                <h1 className="pl-2.5">Recording</h1>
                <div
                    className="flex flex-col p-5"
                    style={{
                    margin: "auto",
                    width: 400,
                    height: 300,
                    background: "black",
                    }}
                ></div>
                {/* Remplazar este div con la webcam */}

            </PageWrapper>
        </>
    );
};

export default Evaluation