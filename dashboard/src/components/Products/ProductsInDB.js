import React from "react";
import ImageProd from "../../assets/images/products/promo-medium-roast.png";

function ProductsInDB(props) {
  return (
    <div className="col-lg-3 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">{props.title}</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "40rem" }}
              src={ImageProd}
              alt="img Of products"
            />
          </div>
          <p>{props.description}</p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            View product detail
          </a>
        </div>
        {/* <script src="../ContentProductsInDb/ContentProductsInDb.js"></script> */}
      </div>
    </div>
  );
}
export default ProductsInDB;
