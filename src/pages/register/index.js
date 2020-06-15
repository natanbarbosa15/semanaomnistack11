import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import cep from "cep-promise";
import * as yup from "yup";

import Input from "../../components/forms/input";
import InputMask from "../../components/forms/inputMask";

import api from "../../services/api";

import imgLogo from "../../assets/images/logo.svg";

yup.setLocale({
  mixed: {
    required: "Preencha o campo",
  },
  string: {
    min: (min) => `É necessário ter no mínimo ${min.min} caracteres`,
  },
});

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  whatsapp: yup.string().required().min(14),
  cep: yup.string().required().min(9),
  state: yup.string().required(),
  city: yup.string().required(),
  neighborhood: yup.string().required(),
  street: yup.string().required(),
  streetNumber: yup.string().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "A senhas digitada não é igual"),
  termos: yup
    .boolean()
    .required()
    .oneOf([true], "É necessário aceitar os termos"),
});

export default function Register() {
  const {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    getValues,
  } = useForm({
    mode: "onBlur",
    validationSchema,
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      cep: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      streetNumber: "",
      password: "",
      confirmPassword: "",
      termos: false,
    },
  });

  const history = useHistory();

  function whatsappMask(value) {
    let numbers = value.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join("").length;
    }

    if (numberLength > 10) {
      return [
        "(",
        /[1-9]/,
        /[1-9]/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    } else {
      return [
        "(",
        /[1-9]/,
        /[1-9]/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    }
  }

  function handleCep() {
    const cepInput = String(getValues("cep")).replace("-", "");
    cep(cepInput).then((result) => {
      setValue("state", result.state);
      setValue("city", result.city);
      setValue("neighborhood", result.neighborhood);
      setValue("street", result.street);
    });
  }

  async function onSubmit(data) {
    try {
      delete data.confirmPassword;
      delete data.termos;

      data.whatsapp = "+55" + data.whatsapp.replace(/[() -]/g, "");

      await api.post("ongs", data);

      history.push("/");
    } catch (error) {
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <Input
                    label="Nome da ONG"
                    name="name"
                    type="text"
                    placeholder="Nome"
                    maxLength={80}
                    column="col-md-6"
                    icon="&#xf007;"
                    errorsInput={errors.name}
                    register={register}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="email@email.com"
                    maxLength={254}
                    column="col-md-6"
                    icon="&#xf0e0;"
                    errorsInput={errors.email}
                    register={register}
                  />
                </div>
                <div className="form-row">
                  <InputMask
                    label="Whatsapp"
                    name="whatsapp"
                    type="text"
                    placeholder="(41) 99999-9999"
                    maxLength={15}
                    column="col-md-4"
                    icon="&#xf879;"
                    errorsInput={errors.whatsapp}
                    control={control}
                    mask={whatsappMask}
                  />
                  <InputMask
                    label="CEP"
                    name="cep"
                    type="text"
                    placeholder="00000-000"
                    maxLength={9}
                    column="col-md-2"
                    icon="&#xf3c5;"
                    errorsInput={errors.cep}
                    control={control}
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                    onBlur={handleCep}
                  />
                  <Input
                    label="Cidade"
                    name="city"
                    type="text"
                    placeholder="Cidade"
                    maxLength={64}
                    column="col-md-4"
                    icon="&#xf3c5;"
                    errorsInput={errors.city}
                    register={register}
                  />
                  <Input
                    label="Estado"
                    name="state"
                    type="text"
                    placeholder="Estado"
                    maxLength={2}
                    column="col-md-2"
                    icon="&#xf3c5;"
                    errorsInput={errors.state}
                    register={register}
                  />
                </div>
                <div className="form-row">
                  <Input
                    label="Bairro"
                    name="neighborhood"
                    type="text"
                    placeholder="Bairro"
                    maxLength={254}
                    column="col-md-4"
                    icon="&#xf3c5;"
                    errorsInput={errors.neighborhood}
                    register={register}
                  />
                  <Input
                    label="Rua"
                    name="street"
                    type="text"
                    placeholder="Nome da Rua"
                    maxLength={254}
                    column="col-md-4"
                    icon="&#xf3c5;"
                    errorsInput={errors.street}
                    register={register}
                  />
                  <Input
                    label="Número"
                    name="streetNumber"
                    type="text"
                    placeholder="Número"
                    maxLength={64}
                    column="col-md-4"
                    icon="&#xf3c5;"
                    errorsInput={errors.streetNumber}
                    register={register}
                  />
                </div>
                <div className="form-row">
                  <Input
                    label="Senha"
                    name="password"
                    type="password"
                    placeholder="Senha"
                    maxLength={16}
                    column="col-md-6"
                    icon="&#xf023;"
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
                    icon="&#xf023;"
                    errorsInput={errors.confirmPassword}
                    register={register}
                  />
                </div>
                <div className="form-group row form-check ml-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termos"
                    name="termos"
                    ref={register}
                  />
                  <label className="form-check-label" htmlFor="termos">
                    Aceito os{" "}
                    <Link to="/useterms" target="_blank">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link to="/privacyterms" target="_blank">
                      Política de Privacidade
                    </Link>
                  </label>
                  {errors.termos && (
                    <div className="invalid-feedback d-block">
                      {errors.termos.message}
                    </div>
                  )}
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
