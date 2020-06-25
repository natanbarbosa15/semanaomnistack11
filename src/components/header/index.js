import React from "react";
import { Link } from "react-router-dom";

import routes from "~/constants/routes";

import imgLogo from "~/assets/images/logo.svg";

const Header = () => {
  return (
    <header className="sticky-top bg-light">
      <nav className="navbar navbar-expand-sm navbar-light font-weight-bold ml-4 mr-4">
        <div className="navbar-brand">
          <img
            className="img-responsive img-fluid w-75 mr-n5"
            src={imgLogo}
            alt="Be The Hero"
          />
        </div>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" id="home" to={routes.home}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="incidents" to={routes.incidents}>
                Casos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="login" to={routes.login}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="register" to={routes.register}>
                Cadastro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="about" to={routes.about}>
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="useterms" to={routes.useTerms}>
                Termos de Uso
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="privacyterms"
                to={routes.privacyTerms}
              >
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
