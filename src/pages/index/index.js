import React from "react";
import { Link } from "react-router-dom";

import routes from "~/constants/routes.js";

import imgLogo from "~/assets/images/logo.svg";
import imgHeroes from "~/assets/images/heroes.png";

export default function Index() {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-lg ml-lg-5">
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
          <div className="row mt-4">
            <div className="col-lg">
              <h1 className="h1 font-weight-bold">Bem-vindo ao Be The Hero</h1>
            </div>
          </div>
          <div className="row d-flex justify-content-start ml-3 mt-3">
            <Link
              to={routes.incidentsAll}
              className="btn btn-lg w-75 btn-default"
            >
              VER CASOS
            </Link>
          </div>
          <div className="row d-flex justify-content-start ml-3 mt-3">
            <Link to={routes.login} className="btn btn-lg w-75 btn-default">
              LOGIN
            </Link>
          </div>
          <div className="row d-flex justify-content-start ml-3 mt-3">
            <Link to={routes.register} className="btn btn-lg w-75 btn-default">
              CADASTRO
            </Link>
          </div>
          <div className="row d-flex justify-content-start ml-3 mt-3">
            <Link to={routes.about} className="btn btn-lg w-75 btn-default">
              SOBRE
            </Link>
          </div>
          <div className="row d-flex justify-content-start ml-1 mt-3">
            <div className="col-md ml-0">
              {" "}
              <Link to={routes.useTerms} className="text-reset">
                <span>Termos de Uso</span>
              </Link>{" "}
            </div>
            <div className="col-md ml-0">
              {" "}
              <Link to={routes.privacyTerms} className="text-reset">
                <span>Política de Privacidade</span>
              </Link>{" "}
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
