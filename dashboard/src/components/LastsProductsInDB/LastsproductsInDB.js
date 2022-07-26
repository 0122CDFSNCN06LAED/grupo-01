import React from "react";

import { useState, useEffect } from "react";

function LastsProductsInDB(props) {
  const [lastProduct, setlastProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/products")
      .then((response) => response.json())
      .then((data) => {
        setlastProduct(data.data[data.data.length - 1]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Lo último de Coffee House {lastProduct.name}
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "40rem" }}
              src={lastProduct.image}
              alt={lastProduct.image}
            />
          </div>
          <p>{lastProduct.description}</p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            View product detail
          </a>
        </div>
      </div>
    </div>
  );
}
export default LastsProductsInDB;
