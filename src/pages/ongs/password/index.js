import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import FirebaseContext from "~/services/firebase";
import AuthContext from "~/services/session";

import routes from "~/constants/routes.js";

import { login } from "~/services/auth";

import Header from "~/components/app/header";

import Input from "~/components/forms/input";

yup.setLocale({
  mixed: {
    required: "Preencha o campo",
  },
  string: {
    min: (min) => `É necessário ter no mínimo ${min.min} caracteres`,
  },
});

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "A senhas digitada não são iguais"),
});

export default function UpdatePassword() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema,
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const firebase = useContext(FirebaseContext);
  const { handleLogout } = useContext(AuthContext);

  const history = useHistory();

  async function onSubmit(data) {
    try {
      setLoading(true);
      setDisplayErrorMessage(false);

      const { email } = await firebase.getCurrentUser();
      const user = await login(email, data.oldPassword, firebase);
      if (user) {
        firebase.passwordUpdate(data.password);

        firebase.signOut();

        handleLogout();

        localStorage.clear();

        history.push(String(routes.login));
      } else {
        setLoading(false);
        setDisplayErrorMessage(true);
        setErrorMessage("Senha inválida.");
      }
    } catch (error) {
      setLoading(false);
      setDisplayErrorMessage(true);
      setErrorMessage("Erro ao atualizar a senha.");
    }
  }

  const ButtonSubmit = () => {
    if (loading) {
      return (
        <span>
          AGUARDE <i className="fa fa-spinner fa-spin fa-1x fa-fw" />
        </span>
      );
    } else {
      return <span>ATUALIZAR</span>;
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex align-content-center justify-content-center mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <Input
                    label="Senha Antiga"
                    name="oldPassword"
                    type="password"
                    placeholder="Senha"
                    maxLength={16}
                    column="col-md-6"
                    icon={<i className="fas fa-lock"></i>}
                    errorsInput={errors.oldPassword}
                    register={register}
                  />
                </div>
                <div className="form-row">
                  <Input
                    label="Nova Senha"
                    name="password"
                    type="password"
                    placeholder="Senha"
                    maxLength={16}
                    column="col-md-6"
                    icon={<i className="fas fa-lock"></i>}
                    errorsInput={errors.password}
                    register={register}
                  />
                  <Input
                    label="Confirmar Senha"
                    name="confirmPassword"
                    type="password"
                    placeholder="Senha"
                    maxLength={16}
                    column="col-md-6"
                    icon={<i className="fas fa-lock"></i>}
                    errorsInput={errors.confirmPassword}
                    register={register}
                  />
                </div>
                <div className="form-group row ml-0">
                  {displayErrorMessage && (
                    <div className="invalid-feedback mb-3 d-block">
                      {errorMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-default"
                    id="atualizar"
                  >
                    <ButtonSubmit />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
