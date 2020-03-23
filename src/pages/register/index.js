import React from "react";
import { Link } from "react-router-dom";

import imgLogo from "../../assets/images/logo.svg";

export default function register() {
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to="/" className="btn btn-default icon-fa">
            &#xf060;
          </Link>
        </div>
        <div className="col ml-lg-5 mr-3">
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
              <h1 className="h1 font-weight-bold">Faça o seu cadastro</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="inputUsername">Nome de usuário</label>
                    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-white icon-fa">
                          &#xf007;
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername"
                        placeholder="Nome de usuário"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
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
                        placeholder="email@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="inputWhatsapp">Whatsapp</label>
                    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-white icon-fa">
                          &#xf879;
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inputWhatsapp"
                        placeholder="(41) 99999-9999"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="inputCity">Cidade</label>
                    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-white icon-fa">
                          &#xf3c5;
                        </div>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="inputCity"
                        placeholder="Cidade"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-2">
                    <label for="inputState">Estado</label>
                    <select
                      id="inputState"
                      className="input-group form-control-sm"
                    >
                      <option selected>PR</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
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
                  <div className="form-group col-md-6">
                    <label for="inputConfirmPassword">Confirmar senha</label>
                    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-white icon-fa">
                          &#xf023;
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="inputConfirmPassword"
                        placeholder="Redigite a senha"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row ml-0">
                  <button type="submit" className="btn btn-default">
                    CADASTRAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
