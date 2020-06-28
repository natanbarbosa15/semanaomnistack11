import React from "react";

import imgHeroes from "~/assets/images/heroes.png";
import imgRocketseat from "~/assets/images/rocketseat.png";
import imgNodejs from "~/assets/images/nodejs.png";
import imgReact from "~/assets/images/react.png";
import imgReactNative from "~/assets/images/reactnative.png";
import imgGoogleCloud from "~/assets/images/googlecloud.png";
import Header from "~/components/header";

export default function About() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-4 no-gutters">
          <div className="col-lg-5 ml-lg-5">
            <div className="row ml-0">
              <div className="col-lg">
                <h1 className="h1 font-weight-bold">Sobre</h1>
              </div>
            </div>
            <div className="row mx-3">
              <p className="text-justify">
                O projeto Be The Hero foi criado pela{" "}
                <a
                  href="https://rocketseat.com.br/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Rocketseat
                </a>{" "}
                na 11º edição da Semana Omnistack. Tendo o objetivo de criar um
                sistema Web e Mobile para ajudar ONGs (Organizações Não
                Governamentais) mostrando os casos que necessitam de ajuda.
              </p>
              <br />
              <p className="text-justify">
                Essa versão foi criada por mim tendo o objetivo de incrementar o
                meu portfólio de projetos, utilizando tecnologias como NodeJS
                (Back-End), ReactJS (Front-End), React Native (Mobile),
                PostgreSQL (Banco de Dados), Google Cloud App Engine (Server
                Back-End), Google Cloud Endpoints (API Gateway para o Server
                Back-End), Google Storage, Google Maps API, Firebase
                Authentication e Firebase Hosting (Server Front-End). Esse
                sistema está hospedado no{" "}
                <a
                  href="https://cloud.google.com/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Google Cloud Platform
                </a>
                .
              </p>
              <br />
              <p className="text-justify">
                Criador desse projeto: Natan De Macedo Barbosa
              </p>
              <br />
              <p className="text-justify">
                Contato:{" "}
                <a href="mailto:natanbarbosa15@gmail.com">
                  natanbarbosa15@gmail.com
                </a>
              </p>
              <br />
              <p className="text-justify">
                Código-fonte no GitHub: <br />
                <a
                  href="https://github.com/NatanNMB15/semanaomnistack11"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  https://github.com/NatanNMB15/semanaomnistack11
                </a>
              </p>
            </div>
            <div className="row mx-3 d-flex align-items-center">
              <div className="col-md-6 mt-3">
                {" "}
                <a
                  href="https://rocketseat.com.br/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <img
                    src={imgRocketseat}
                    className="img-fluid"
                    alt="Rocketseat"
                  />{" "}
                </a>{" "}
              </div>
              <div className="col-md-6 mt-3">
                {" "}
                <a
                  href="https://nodejs.org/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <img
                    src={imgNodejs}
                    className="img-fluid"
                    alt="NodeJS"
                  />{" "}
                </a>{" "}
              </div>
              <div className="col-md-6 mt-3">
                {" "}
                <a
                  href="https://reactnative.dev/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <img
                    src={imgReactNative}
                    className="img-fluid"
                    alt="React Native"
                  />{" "}
                </a>{" "}
              </div>
              <div className="col-md-2 mt-3">
                {" "}
                <a
                  href="https://reactjs.org/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <img
                    src={imgReact}
                    className="img-fluid"
                    alt="ReactJS"
                  />{" "}
                </a>{" "}
              </div>
              <div className="col-md-4 mt-3">
                {" "}
                <a
                  href="https://cloud.google.com/"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <img
                    src={imgGoogleCloud}
                    className="img-fluid"
                    alt="Google Cloud Platform"
                  />{" "}
                </a>{" "}
              </div>
            </div>
          </div>
          <div className="col-lg-auto mt-4">
            <img
              src={imgHeroes}
              className="img-fluid"
              id="Heroes"
              alt="Heroes"
            />
          </div>
        </div>
      </div>
    </>
  );
}
