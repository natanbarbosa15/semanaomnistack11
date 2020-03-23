import React from "react";
import { Link } from "react-router-dom";

import imgLogo from "../../assets/images/logo.svg";
import imgHeroes from "../../assets/images/heroes.png";

export default function login() {
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to="/" className="btn btn-default icon-fa">
            &#xf060;
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
          <div className="row mt-4">
            <div className="col-lg">
              <h1 className="h1 font-weight-bold">Faça o seu Login</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <form>
                <div className="form-group">
                  <label for="inputEmail">Email</label>
                  <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-white icon-fa">
                        &#xf0e0;
                      </div>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      aria-describedby="emailHelp"
                      placeholder="email@email.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputPassword">Senha</label>
                  <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                    <div className="input-group-prepend">
                      <div className="input-group-text bg-white icon-fa">
                        &#xf023;
                      </div>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Senha"
                    />
                  </div>
                </div>
                <div className="form-group row ml-0">
                  <button type="submit" className="btn btn-default">
                    LOGIN
                  </button>
                  <a className="text-reset ml-3" href="#">
                    <span>Esqueci minha senha</span>
                  </a>{" "}
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg mr-4 text-justify">
              <p>
                Não possui cadastro? Realize o cadastro clicando no botão
                abaixo.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg">
              <Link to="/register" className="btn btn-default">
                CADASTRO
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-5 mt-4">
          {" "}
          <img
            src={imgHeroes}
            className="img-fluid"
            id="Heroes"
            alt="Heroes"
          />{" "}
        </div>
      </div>
    </div>
  );
}
