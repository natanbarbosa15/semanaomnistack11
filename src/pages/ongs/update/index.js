import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import cep from "cep-promise";
import * as yup from "yup";

import FirebaseContext from "~/services/firebase";

import Api from "~/services/api";

import routes from "~/constants/routes.js";

import Header from "~/components/app/header";
import Input from "~/components/forms/input";
import InputMask from "~/components/forms/inputMask";
import LoadingComponent from "~/components/loading";

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
  state: yup.string().required().min(2),
  city: yup.string().required(),
  neighborhood: yup.string().required(),
  street: yup.string().required(),
  streetNumber: yup.string().required(),
});

export default function UpdateProfile() {
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
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const cancelAxios = Axios.CancelToken.source();
  const api = Api(firebase);

  useEffect(() => {
    function handleWhatsappData(value) {
      const temp = value.replace("+55", "");
      var whatsapp = "(" + temp.substring(0, 2) + ") " + temp.substring(2);
      if (whatsapp.length > 13) {
        whatsapp = whatsapp.substring(0, 10) + "-" + whatsapp.substring(10);
      } else {
        whatsapp = whatsapp.substring(0, 9) + "-" + whatsapp.substring(9);
      }
      return whatsapp;
    }
    async function getUser() {
      try {
        const { id } = await firebase.getCurrentUser();
        const response = await api.get(`ongs/${id}`, {
          cancelToken: cancelAxios.token,
        });
        setValue("name", response.data.name, true);
        setValue("email", response.data.email, true);
        setValue("whatsapp", handleWhatsappData(response.data.whatsapp), true);
        setValue("cep", response.data.cep, true);
        setValue("state", response.data.state, true);
        setValue("city", response.data.city, true);
        setValue("neighborhood", response.data.neighborhood, true);
        setValue("street", response.data.street, true);
        setValue("streetNumber", response.data.streetNumber, true);
        setLoadingPage(false);
      } catch (error) {
        if (Axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    }
    getUser();

    return () => {
      cancelAxios.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPage]);

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
      setLoadingSubmit(true);
      setDisplayErrorMessage(false);

      const { email } = await firebase.getCurrentUser();

      delete data.confirmPassword;
      delete data.termos;

      data.whatsapp = "+55" + data.whatsapp.replace(/[() -]/g, "");

      await api.put("ongs", data);

      // If Email not changed no need to logout
      if (email === data.email) {
        await firebase.updateCurrentUser();
        history.push(String(routes.profile));
      } else {
        firebase.signOut();

        localStorage.clear();

        history.push(String(routes.login));
      }
    } catch (error) {
      setLoadingSubmit(false);
      setDisplayErrorMessage(true);
      setErrorMessage(error.response.data.message);
    }
  }

  async function deleteOng() {
    await api.delete("ongs");
    firebase.signOut();

    localStorage.clear();

    history.push(String(routes.login));
  }

  const ButtonSubmit = () => {
    if (loadingSubmit) {
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
          {loadingPage ? (
            <LoadingComponent />
          ) : (
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
                      icon={<i className="fas fa-user"></i>}
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
                      icon={<i className="fas fa-envelope"></i>}
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
                      icon={<i className="fas fa-phone-alt"></i>}
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
                      icon={<i className="fas fa-map-marker-alt"></i>}
                      errorsInput={errors.cep}
                      control={control}
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      onBlur={handleCep}
                    />
                    <Input
                      label="Cidade"
                      name="city"
                      type="text"
                      placeholder="Cidade"
                      maxLength={64}
                      column="col-md-4"
                      icon={<i className="fas fa-map-marker-alt"></i>}
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
                      icon={<i className="fas fa-map-marker-alt"></i>}
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
                      icon={<i className="fas fa-map-marker-alt"></i>}
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
                      icon={<i className="fas fa-map-marker-alt"></i>}
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
                      icon={<i className="fas fa-map-marker-alt"></i>}
                      errorsInput={errors.streetNumber}
                      register={register}
                    />
                  </div>
                  <div className="form-group row ml-0">
                    <Link
                      className="text-reset"
                      to={routes.updatePassword}
                      id="updatePassword"
                    >
                      Clique aqui se quiser atualizar a senha
                    </Link>
                  </div>
                  <div
                    className="modal fade"
                    id="deleteOngModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="deleteOngModal"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteOngModal">
                            Excluir conta
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>
                            Tem certeza que deseja excluir sua conta? Todos os
                            casos cadastrados também serão excluídos.
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Não
                          </button>
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            onClick={deleteOng}
                          >
                            Sim
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row ml-0">
                    <button
                      type="button"
                      className="text-danger btn btn-link"
                      data-toggle="modal"
                      data-target="#deleteOngModal"
                      id="deleteOng"
                    >
                      Clique aqui se quiser deletar sua conta
                    </button>
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
          )}
        </div>
      </div>
    </>
  );
}
