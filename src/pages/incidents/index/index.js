import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import routes from "~/constants/routes";

import Api from "~/services/api";

import Header from "~/components/header";
import LoadingComponent from "~/components/loading";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  const cancelAxios = Axios.CancelToken.source();
  const api = Api();

  useEffect(() => {
    async function getIncidents() {
      try {
        const response = await api.get("incidents", {
          cancelToken: cancelAxios.token,
        });
        setIncidents(response.data);
        setLoadingPage(false);
        setErrorLoading(false);
      } catch (error) {
        if (Axios.isCancel(error)) {
        } else {
          setErrorLoading(true);
          setLoadingPage(false);
          throw error;
        }
      }
    }

    const interval = setInterval(getIncidents, 2000);

    return () => {
      cancelAxios.cancel();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="row mt-2">
          <div className="col">
            <p className="h1">Casos</p>
          </div>
        </div>
        {loadingPage ? (
          <LoadingComponent />
        ) : errorLoading ? (
          <div className="row mt-2 ml-3">
            <div className="col">
              <p className="h1 text-danger">Erro ao carregar os casos.</p>
            </div>
          </div>
        ) : incidents.length === 0 ? (
          <div className="row mt-2">
            <div className="col">
              <p className="h3">Não há casos cadastrados no momento.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {incidents.map((incident) => (
              <div className="col-md-6 mt-3 mb-3" key={incident.id}>
                <div className="card flex-md-row box-shadow border border-white rounded">
                  <div className="card-body d-flex flex-column align-items-start ml-2 mt-2 mb-3">
                    <p className="card-subtitle d-flex">
                      <strong>Caso:</strong>
                    </p>
                    <p className="card-text" id="title">
                      {incident.title}
                    </p>
                    <p className="card-subtitle">
                      <strong>Descrição:</strong>
                    </p>
                    <p className="card-text mt-2" id="description">
                      {incident.description}
                    </p>
                    <p className="card-subtitle">
                      <strong>Valor:</strong>
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
                      <Link
                        to={routes.incidents + `/${incident.id}`}
                        id="readIncident"
                        className="btn btn-default"
                      >
                        Visualizar
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
