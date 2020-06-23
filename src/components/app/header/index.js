import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import routes from "~/constants/routes";

import FirebaseContext from "~/services/firebase";
import AuthContext from "~/services/session";

import imgLogo from "~/assets/images/logo.svg";

const Header = () => {
  const firebase = useContext(FirebaseContext);
  const { handleLogout } = useContext(AuthContext);

  const history = useHistory();

  async function logout() {
    try {
      firebase.signOut();

      handleLogout();

      localStorage.clear();

      history.push(String(routes.home));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="sticky-top bg-light">
      <nav className="navbar navbar-expand-sm navbar-light font-weight-bold ml-4 mr-4">
        <div className="navbar-brand">
          <img
            className="img-responsive img-fluid w-75 mr-n5"
            src={imgLogo}
            alt="Be The Hero"
          />
        </div>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" id="home" to={routes.profile}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="newIncident"
                to={routes.newIncident}
              >
                Cadastrar novo caso
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="updateProfile"
                to={routes.updateProfile}
              >
                Conta
              </Link>
            </li>
          </ul>
          <button
            onClick={logout}
            id="logout"
            type="button"
            className="btn btn-link text-reset"
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
