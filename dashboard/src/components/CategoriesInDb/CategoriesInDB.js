import React from "react";

function CategoriesInDB(props) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-dark text-white shadow">
        <div className="card-body">{props.name}   |   Total: {props.total}</div>
      </div>
    </div>
  );
}

export default CategoriesInDB;

