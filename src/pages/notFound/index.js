import React from "react";

import Header from "~/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row mt-3 no-gutters">
          <div className="col ml-lg-5">
            <div className="row mt-2">
              <div className="col-lg">
                <h1 className="h1 font-weight-bold">
                  Página não encontrada. (Error 404)
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
