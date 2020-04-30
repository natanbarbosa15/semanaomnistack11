import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import imgLogo from "../../assets/images/logo.svg";

export default function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    whatsapp: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  async function handleSignUp(e) {
    e.preventDefault();

    const postData = {
      username: state.username,
      email: state.email,
      whatsapp: state.whatsapp,
      city: state.city,
      state: state.state,
      password: state.password,
    };

    try {
      await api.post("users", postData);
      history.push("/");
    } catch {
      alert("Falha no cadastro, tente novamente mais tarde.");
    }
  }

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
              <form onSubmit={handleSignUp}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputUsername">Nome da ONG</label>
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
                        onChange={(e) =>
                          setState({ ...state, username: e.target.value })
                        }
                        required
                      />
                      <div className="invalid-feedback">
                        Já existe uma ONG cadastrada com esse nome.
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
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
                        onChange={(e) =>
                          setState({ ...state, email: e.target.value })
                        }
                        required
                      />
                      <div className="invalid-feedback">
                        Já existe uma ONG cadastrada com esse Email.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputWhatsapp">Whatsapp</label>
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
                        onChange={(e) =>
                          setState({ ...state, whatsapp: e.target.value })
                        }
                        required
                      />
                      <div className="invalid-feedback">
                        Já existe uma ONG cadastrada com esse Whatsapp.
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputCity">Cidade</label>
                    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-white icon-fa">
                          &#xf3c5;
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCity"
                        placeholder="Cidade"
                        onChange={(e) =>
                          setState({ ...state, city: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputState">Estado</label>
                    <select
                      id="inputState"
                      className="input-group form-control-sm"
                      onChange={(e) =>
                        setState({ ...state, state: e.target.value })
                      }
                      required
                    >
                      <option>AC</option>
                      <option>AL</option>
                      <option>AP</option>
                      <option>AM</option>
                      <option>BA</option>
                      <option>CE</option>
                      <option>DF</option>
                      <option>ES</option>
                      <option>GO</option>
                      <option>MA</option>
                      <option>MT</option>
                      <option>MS</option>
                      <option>MG</option>
                      <option>PA</option>
                      <option>PB</option>
                      <option>PR</option>
                      <option>PE</option>
                      <option>PI</option>
                      <option>RJ</option>
                      <option>RN</option>
                      <option>RS</option>
                      <option>RO</option>
                      <option>RR</option>
                      <option>SC</option>
                      <option>SP</option>
                      <option>SE</option>
                      <option>TO</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword">Senha</label>
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
                        onChange={(e) =>
                          setState({ ...state, password: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputConfirmPassword">
                      Confirmar senha
                    </label>
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
                        onChange={(e) =>
                          setState({
                            ...state,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row form-check ml-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Aceito os{" "}
                    <Link to="/useterms" target="_blank">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link to="/privacyterms" target="_blank">
                      Política de Privacidade
                    </Link>
                  </label>
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
