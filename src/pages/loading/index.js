import React from "react";

export default function Loading() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg d-flex justify-content-center vh-100">
            <p className="h2 mt-auto mb-auto">
              <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
