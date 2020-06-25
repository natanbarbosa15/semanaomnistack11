import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import FirebaseContext from "~/services/firebase";

import Api from "~/services/api";

import routes from "~/constants/routes.js";

import Input from "~/components/forms/input";

import imgHeroes from "~/assets/images/heroes.png";
import Header from "~/components/header";

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
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const history = useHistory();

  const { firebase, setLogin } = useContext(FirebaseContext);

  const api = Api(firebase);

  async function onSubmit(data) {
    try {
      setLoadingSubmit(true);
      setDisplayErrorMessage(false);
      const user = await firebase.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      if (user) {
        await api.post("sessions", data);
        setLogin();
        history.push(String(routes.profile));
      } else {
        setLoadingSubmit(false);
        setDisplayErrorMessage(true);
        setErrorMessage("Email e/ou senha inválidos.");
      }
    } catch {
      setLoadingSubmit(false);
      setDisplayErrorMessage(true);
      setErrorMessage("Falha no Login, tente novamente mais tarde.");
    }
  }

  const ButtonSubmit = () => {
    if (loadingSubmit) {
      return (
        <span>
          AGUARDE <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
        </span>
      );
    } else {
      return <span>LOGIN</span>;
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid">
          <div className="row mt-4 no-gutters">
            <div className="col-lg-5 ml-lg-5">
              <div className="row">
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
                      icon={<i className="fas fa-envelope"></i>}
                      errorsInput={errors.email}
                      register={register}
                    />
                    <Input
                      label="Senha"
                      name="password"
                      type="password"
                      placeholder="Senha"
                      maxLength={16}
                      icon={<i className="fas fa-lock"></i>}
                      errorsInput={errors.password}
                      register={register}
                    />
                    {displayErrorMessage && (
                      <div className="invalid-feedback mb-3 d-block">
                        {errorMessage}
                      </div>
                    )}
                    <div className="form-group row ml-0">
                      <button type="submit" className="btn btn-default">
                        <ButtonSubmit />
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
      </div>
    </>
  );
}
