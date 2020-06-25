import React, { useState, useEffect } from "react";

import Api from "~/services/api";

import Header from "~/components/header";
import LoadingComponent from "~/components/loading";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const api = Api();

  useEffect(() => {
    setIsActive(true);

    function getIncidents() {
      if (isActive) {
        api.get("incidents").then((response) => {
          setIncidents(response.data);
          setLoadingPage(false);
        });
      }
    }

    const interval = setInterval(getIncidents, 2000);

    return () => {
      clearInterval(interval);
      setIsActive(false);
    };
  }, [api, incidents, isActive, loadingPage]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid pt-3">
          <div className="row mt-2">
            <div className="col-md">
              <p className="h1">Casos</p>
            </div>
          </div>
          {loadingPage ? (
            <LoadingComponent />
          ) : incidents.length === 0 ? (
            <div className="row mt-2">
              <div className="col-md">
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
                      <p className="card-text mt-2" id="value">
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(incident.value)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
