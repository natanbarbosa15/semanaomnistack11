import React from "react";
import Header from "~/components/header";

export default function PrivacyTerms() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col mx-4 embed-responsive embed-responsive-1by1 vh-100 min-vh-100">
            <iframe
              title="Privacy Terms"
              className="embed-responsive"
              src="https://www.iubenda.com/privacy-policy/55306019/legal"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
