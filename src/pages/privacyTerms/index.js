import React from "react";
import Header from "~/components/header";

export default function PrivacyTerms() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-4 no-gutters">
          <div className="col ml-lg-5 mr-3">
            <div className="row">
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
    </>
  );
}
