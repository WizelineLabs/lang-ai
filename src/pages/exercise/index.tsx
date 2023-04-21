import { type NextPage } from "next";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";

import { api } from "~/utils/api";

const Exercise: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Lesson Title</PageTitle>
              <h2 className="py-2 font-sans text-gray-500">
                Read the following text
              </h2>
            </div>

            <div className="my-auto flex flex-row space-x-5">
              <h2 className="py-3 font-sans">1 of 10</h2>
              <Button>Previous</Button>

              <Button>Next</Button>
            </div>
          </div>
          <Section>
            <div className="px-4 py-3">
              <h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </div>
          </Section>
          <br />
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
          <Section>
            <div style={{ width: "75%", float: "left" }}>
              <div style={{ width: "50%", float: "left", padding: 20 }}>
                <Button>Record</Button> {/* Remplazar boton por icono record*/}
              </div>
              <div style={{ width: "45%", float: "right", padding: 20 }}>
                <Button>Volumen</Button>
              </div>
            </div>
            <div style={{ width: "15%", float: "right", padding: 20 }}>
              <Button>Redo</Button>
              {/* Remplazar boton por icono redo*/}
            </div>
          </Section>
        </div>
      </PageWrapper>
    </>
  );
};

export default Exercise;
