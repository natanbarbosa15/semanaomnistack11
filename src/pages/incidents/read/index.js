import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

import Api from "~/services/api";

import Header from "~/components/header";
import LoadingComponent from "~/components/loading";
import routes from "~/constants/routes";

export default function ReadIncident() {
  const [incident, setIncident] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  const { id } = useParams();

  const cancelAxios = Axios.CancelToken.source();
  const api = Api();

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

    async function getIncident() {
      try {
        const response = await api.get(`incidents/${id}`, {
          cancelToken: cancelAxios.token,
        });
        response.data.whatsappUri = response.data.whatsapp;
        response.data.whatsapp = handleWhatsappData(response.data.whatsapp);
        setIncident(response.data);
        setLoadingPage(false);
      } catch (error) {
        if (Axios.isCancel(error)) {
        } else {
          setLoadingPage(false);
          throw error;
        }
      }
    }

    getIncident();

    return () => {
      cancelAxios.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-3">
        {loadingPage ? (
          <LoadingComponent />
        ) : !incident ? (
          <div className="row mt-2 ml-3">
            <div className="col-0 ml-3">
              <Link to={routes.incidents} className="btn btn-default icon-fa">
                <i className="fas fa-arrow-left" />
              </Link>
            </div>
            <div className="col-auto">
              <p className="h1 text-danger">Erro ao carregar o caso.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="row mt-2">
              <div className="col-0 ml-3">
                <Link to={routes.incidents} className="btn btn-default icon-fa">
                  <i className="fas fa-arrow-left" />
                </Link>
              </div>
              <div className="col-auto">
                <p className="h1">Caso "{incident.title}"</p>
              </div>
            </div>
            <div className="row">
              <div className="col mt-3 mb-3">
                <div className="card flex-md-row box-shadow border border-white rounded">
                  <div className="card-body d-flex flex-column align-items-start ml-2 mt-2 mb-3">
                    <p className="card-subtitle d-flex justify-content-between w-100">
                      <strong>Caso:</strong>
                      <strong>Nome da ONG:</strong>
                    </p>
                    <p
                      className="card-text d-flex justify-content-between w-100"
                      id="title"
                    >
                      <span>{incident.title}</span>
                      <span>{incident.name}</span>
                    </p>
                    <p className="card-subtitle d-flex justify-content-between w-100">
                      <strong>Descrição:</strong>
                      <strong>Email:</strong>
                    </p>
                    <p
                      className="card-text mt-2 d-flex justify-content-between w-100"
                      id="description"
                    >
                      <span>{incident.description}</span>
                      <span>
                        <a href="mailto:natanbarbosa15@gmail.com">
                          {incident.email}
                        </a>
                      </span>
                    </p>
                    <p className="card-subtitle d-flex justify-content-between w-100">
                      <strong>Valor:</strong>
                      <strong>Whatsapp:</strong>
                    </p>
                    <p
                      className="card-text mt-2 d-flex justify-content-between w-100"
                      id="value"
                    >
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(incident.value)}
                      </span>
                      <span>
                        <a
                          href={`https://api.whatsapp.com/send?phone=${incident.whatsappUri}`}
                          rel="nofollow noopener noreferrer"
                          target="_blank"
                        >
                          {incident.whatsapp}
                        </a>
                      </span>
                    </p>
                    <p className="card-subtitle d-flex">
                      <strong>Endereço da ONG:</strong>
                    </p>
                    <p
                      className="card-text mt-2 d-flex justify-content-between w-100"
                      id="value"
                    >
                      <span>
                        {incident.street} {incident.streetNumber},{" "}
                        {incident.neighborhood}, {incident.city} -{" "}
                        {incident.state}, CEP - {incident.cep}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body embed-responsive embed-responsive-16by9">
                    <iframe
                      title="Google Maps"
                      frameBorder="0"
                      className="embed-responsive-item"
                      src={`https://www.google.com/maps/embed/v1/place?q=${incident.street.replace(
                        " ",
                        "+"
                      )},+${
                        incident.streetNumber
                      }+-+${incident.neighborhood.replace(
                        " ",
                        "+"
                      )},+${incident.city.replace(" ", "+")},+${
                        incident.state
                      }&key=${process.env.REACT_APP_MAPS_API_KEY}`}
                      allowFullScreen
                    ></iframe>{" "}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
