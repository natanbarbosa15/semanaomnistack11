import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import FirebaseContext from "~/services/firebase";

import Api from "~/services/api";

import routes from "~/constants/routes.js";

import Header from "~/components/app/header";
import Input from "~/components/forms/input";
import TextArea from "~/components/forms/textArea";

yup.setLocale({
  mixed: {
    required: "Preencha o campo",
  },
  string: {
    min: (min) => `É necessário ter no mínimo ${min.min} caracteres`,
  },
});

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  value: yup.number().required().typeError("Digite um valor válido"),
});

export default function NewIncident() {
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onBlur",
    validationSchema,
    defaultValues: {
      title: "",
      description: "",
      value: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const api = Api(firebase);

  function handleDigits(event) {
    var temp = event.target.value;
    // Replace comma with dot
    temp = temp.replace(/,/g, ".").replace(/ /g, "");
    if (/^[-]?\d+(\.\d+)?$/.test(temp)) {
      setValue("value", Number(temp));
    }
  }

  async function onSubmit(data) {
    try {
      setLoadingSubmit(true);
      setDisplayErrorMessage(false);
      await api.post("incidents", data);

      history.push(String(routes.profile));
    } catch (error) {
      setLoadingSubmit(false);
      setDisplayErrorMessage(true);
      setErrorMessage("Erro ao cadastrar o caso.");
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
      return <span>CADASTRAR</span>;
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 mb-3">
        <div className="row">
          <div className="col-lg-6">
            <section>
              <h1>Cadastrar novo caso</h1>
              <p>
                Descreva o caso detalhadamente para encontrar um herói para
                resolver.
              </p>
            </section>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <Input
                  label="Título do caso"
                  name="title"
                  type="text"
                  placeholder="Título"
                  maxLength={80}
                  column="col-md-6"
                  errorsInput={errors.title}
                  register={register}
                />
              </div>
              <div className="form-row">
                <TextArea
                  label="Descrição do caso"
                  name="description"
                  placeholder="Descrição"
                  maxLength={5242880}
                  column="col-md-6"
                  errorsInput={errors.description}
                  register={register}
                />
              </div>
              <div className="form-row">
                <Input
                  label="Valor em reais"
                  name="value"
                  type="text"
                  placeholder="Valor"
                  maxLength={254}
                  column="col-md-6"
                  errorsInput={errors.value}
                  register={register}
                  handleChange={handleDigits}
                />
              </div>
              {displayErrorMessage && (
                <div className="invalid-feedback mb-3 d-block">
                  {errorMessage}
                </div>
              )}
              <button className="btn btn-default" id="cadastrar" type="submit">
                <ButtonSubmit />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
