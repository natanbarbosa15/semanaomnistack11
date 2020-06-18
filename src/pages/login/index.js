import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import routes from "../../constants/routes.js";

import Input from "../../components/forms/input";

import FirebaseContext from "../../services/firebase";
import AuthContext from "../../services/session";

import api from "../../services/api";
import { login } from "../../services/auth";

import imgLogo from "../../assets/images/logo.svg";
import imgHeroes from "../../assets/images/heroes.png";

yup.setLocale({
  mixed: {
    required: "Preencha o campo",
  },
});

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState("");

  const history = useHistory();

  const firebase = useContext(FirebaseContext);
  const { handleLogin } = useContext(AuthContext);

  async function onSubmit(data) {
    try {
      setDisplayErrorMessage("");
      const user = await login(data.email, data.password, firebase);
      if (user) {
        handleLogin();
        await api.post("sessions", data);
        history.push(String(routes.profile));
      } else {
        setDisplayErrorMessage("d-block");
        setErrorMessage("Email e/ou senha inválidos.");
      }
    } catch {
      setDisplayErrorMessage("d-block");
      setErrorMessage("Falha no Login, tente novamente mais tarde.");
    }
  }
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to={routes.home} className="btn btn-default icon-fa">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="email@email.com"
                  maxLength={254}
                  icon="&#xf0e0;"
                  errorsInput={errors.email}
                  register={register}
                />
                <Input
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  maxLength={16}
                  icon="&#xf023;"
                  errorsInput={errors.password}
                  register={register}
                />
                <div className={`invalid-feedback mb-3 ${displayErrorMessage}`}>
                  {errorMessage}
                </div>
                <div className="form-group row ml-0">
                  <button type="submit" className="btn btn-default">
                    LOGIN
                  </button>
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
              <Link to={routes.register} className="btn btn-default">
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
