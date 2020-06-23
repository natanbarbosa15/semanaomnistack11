import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import routes from "~/constants/routes.js";

import api from "~/services/api";

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

export default function UpdateIncident() {
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
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    api.get(`incidents/${id}`).then((response) => {
      setValue("title", response.data.title);
      setValue("description", response.data.description);
      setValue("value", Number(response.data.value));
    });
  }, [id, setValue]);

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
      setLoading(true);
      setDisplayErrorMessage(false);
      await api.put(`incidents/${id}`, data);

      history.push(String(routes.profile));
    } catch (error) {
      setLoading(false);
      setDisplayErrorMessage(true);
      setErrorMessage("Erro ao cadastrar o caso.");
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
            <div className="col-md">
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
                <button
                  className="btn btn-default"
                  type="submit"
                  id="atualizar"
                >
                  <ButtonSubmit />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
