import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit } from "react-icons/fi";

import FirebaseContext from "~/services/firebase";

import Api from "~/services/api";

import Header from "~/components/app/header";

import routes from "~/constants/routes";
import LoadingComponent from "~/components/loading";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [ongName, setOngName] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const { firebase } = useContext(FirebaseContext);

  const api = Api(firebase);

  useEffect(() => {
    setIsActive(true);

    async function getUser() {
      if (isActive) {
        const { name } = await firebase.getCurrentUser();
        setOngName(name);
        getIncidents();
        setLoadingPage(false);
      }
    }

    function getIncidents() {
      if (isActive) {
        api.get("profile").then((response) => setIncidents(response.data));
      }
    }

    getUser();

    return () => {
      setIsActive(false);
    };
  }, [incidents, firebase, loadingPage, api, isActive]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`);

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid pt-3">
          {loadingPage ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="row mt-3">
                <div className="col-md">
                  <p className="h3">Bem vindo(a), {ongName}</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md">
                  <p className="h1">Casos cadastrados</p>
                </div>
              </div>
              {incidents.length === 0 ? (
                <div className="row mt-2">
                  <div className="col-md">
                    <p className="h3">Não há casos cadastrados.</p>
                  </div>
                </div>
              ) : (
                <div className="row mt-2">
                  {incidents.map((incident) => (
                    <div className="col-md-6 mt-3 mb-3" key={incident.id}>
                      <div className="card flex-md-row box-shadow border border-white rounded">
                        <div className="card-body d-flex flex-column align-items-start ml-2 mt-2 mb-3">
                          <p className="card-subtitle d-flex justify-content-between w-100">
                            <strong>Caso:</strong>
                            <span className="justify-content-between">
                              <Link
                                to={routes.updateIncident + `/${incident.id}`}
                                id="updateIncident"
                              >
                                <FiEdit size={20} color="#A8A8B3" />
                              </Link>
                              <button
                                onClick={() =>
                                  handleDeleteIncident(incident.id)
                                }
                                type="button"
                                id="delete"
                                className="btn bg-transparent"
                                title="Excluir"
                              >
                                <FiTrash2 size={20} color="#A8A8B3" />
                              </button>
                            </span>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
