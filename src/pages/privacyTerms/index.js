import React from "react";
import { Link } from "react-router-dom";

import routes from "../../constants/routes.js";

import imgLogo from "../../assets/images/logo.svg";

export default function PrivacyTerms() {
  return (
    <div className="container-fluid">
      <div className="row mt-3 no-gutters">
        <div className="col-sm-0">
          <Link to={routes.home} className="btn btn-default icon-fa">
            <i className="fas fa-arrow-left" />
          </Link>
        </div>
        <div className="col ml-lg-5 mr-3">
          <div className="row">
            <div className="col-lg-0">
              {" "}
              <img
                src={imgLogo}
                alt="Logo"
                className="img-fluid"
                id="logo"
              />{" "}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-0 embed-responsive embed-responsive-1by1">
              <iframe
                title="Privacy Terms"
                className="embed-responsive"
                src="https://www.iubenda.com/privacy-policy/55306019/legal"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
