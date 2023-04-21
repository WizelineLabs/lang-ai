import { type NextPage } from "next";
import PageTitle from "~/components/PageTitle";
import PageWrapper from "~/components/PageWrapper";
import Button from "~/components/Button";
import Section from "~/components/Section";

import { api } from "~/utils/api";

const Camtest: NextPage = () => {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <PageTitle editsTitle>Webcam Test</PageTitle>
              <h2 style={{ paddingTop: 10, color: "GrayText" }}>
                Check your audio and video devices
              </h2>
            </div>

            <div className="my-auto flex flex-row space-x-3">
              <a href="/exercise">
                <Button>Next</Button>
              </a>
            </div>
          </div>

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

export default Camtest;
