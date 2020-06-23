import React from "react";
import { Link } from "react-router-dom";

import routes from "~/constants/routes.js";

import imgLogo from "~/assets/images/logo.svg";
import imgHeroes from "~/assets/images/heroes.png";
import imgRocketseat from "~/assets/images/rocketseat.png";
import imgNodejs from "~/assets/images/nodejs.png";
import imgReact from "~/assets/images/react.png";
import imgReactNative from "~/assets/images/reactnative.png";
import imgGoogleCloud from "~/assets/images/googlecloud.png";

export default function About() {
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to={routes.home} className="btn btn-default icon-fa">
            <i className="fas fa-arrow-left" />
          </Link>
        </div>
        <div className="col-lg-5 ml-lg-5">
          <div className="row">
            <div className="col-lg">
              {" "}
              <img
                src={imgLogo}
                alt="Logo"
                className="img-fluid"
                id="logo"
              />{" "}
            </div>
          </div>
          <div className="row mt-4 ml-0">
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
              meu portfólio de projetos, utilizando tecnologias como NodeJS,
              React, React Native, Google Cloud App Engine, Google Cloud
              Endpoint (API Gateway), Google Storage e Google Filestore. Esse
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
                <img src={imgNodejs} className="img-fluid" alt="NodeJS" />{" "}
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
                <img src={imgReact} className="img-fluid" alt="ReactJS" />{" "}
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
        <div className="col-lg mt-4">
          <img src={imgHeroes} className="img-fluid" id="Heroes" alt="Heroes" />
        </div>
      </div>
    </div>
  );
}
