import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import routes from "../../constants/routes.js";

import api from "../../services/api";

import "./styles.css";

import imgLogo from "../../assets/images/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post("incidents", data);

      history.push(String(routes.profile));
    } catch (error) {
      alert("Erro ao cadastrar caso.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={imgLogo} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to={routes.profile}>
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
