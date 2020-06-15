import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import FirebaseContext from "../../services/firebase";
import AuthContext from "../../services/session";

import api from "../../services/api";

import "./styles.css";

import imgLogo from "../../assets/images/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [ongName, setOngName] = useState("");

  const firebase = useContext(FirebaseContext);
  const { handleLogout } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    api.get("profile").then((response) => {
      setIncidents(response.data);
    });
    function getUser() {
      const { name } = firebase.getCurrentUser();
      setOngName(name);
    }
    getUser();
  }, [firebase]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`);

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  async function logout() {
    try {
      firebase.signOut();

      handleLogout();

      localStorage.clear();

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={imgLogo} alt="Be The Hero" />
        <span>Bem vindo(a), {ongName}</span>

        <Link className="button" to="/app/newincident">
          Cadastrar novo caso
        </Link>
        <button onClick={logout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
