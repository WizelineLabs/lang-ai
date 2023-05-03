import { ReactNode, useState } from "react";
import { type NextPage } from "next";
import Section from "~/components/Section";
import PageWrapper from "~/components/PageWrapper";
import PageTitle from "~/components/PageTitle";

const Finished: NextPage = () =>{

    return(
        <>
            <PageWrapper>
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-start-2 col-span-4 place-self-center">
                        <PageTitle editsTitle>Final Result</PageTitle>
                    </div>
                    <div className="col-start-2 col-span-4 place-self-center">
                        Lesson Score
                    </div>
                </div>

                <div className="pt-5">
                    <PageTitle editsTitle>AI Suggestions</PageTitle>
                    <Section>
                        <div className="px-4 py-3">
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad aliquam eveniet vitae, obcaecati, ducimus veniam inventore quasi doloribus illo ipsa voluptas odit reprehenderit. Delectus architecto nobis eligendi quasi laudantium. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate quaerat, possimus consequuntur perspiciatis autem ad nam natus numquam dignissimos, commodi reprehenderit repellat maiores vitae mollitia. Facere ab explicabo maiores corrupti.</h1>
                        </div>
                    </Section>
                </div>
            </PageWrapper>
        </>
    );
};

export default Finished