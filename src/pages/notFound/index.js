import React from "react";
import { Link } from "react-router-dom";

import imgLogo from "../../assets/images/logo.svg";

export default function NotFound() {
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to="/" className="btn btn-default icon-fa">
            &#xf060;
          </Link>
        </div>
        <div className="col-lg-5 ml-lg-5">
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
              <h1 className="h1 font-weight-bold">Página não encontrada.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
