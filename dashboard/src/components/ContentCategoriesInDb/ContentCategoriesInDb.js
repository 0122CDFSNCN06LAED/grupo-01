import React, { Component } from "react";
import CategoriesInDB from "../CategoriesInDb/CategoriesInDB";

class ContentCategoriesInDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null,
      bgColor: "",
    };
  }
  render() {
    if (!this.state.categories) {
      return "Cargando...";
    }

    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5
              className="m-0 font-weight-bold text-gray-800"
              onMouseOver={() => {
                this.setState({ bgColor: "bg-secondary" });
              }}
              onMouseOut={() => {
                this.setState({ bgColor: "" });
              }}
            >
              Categorías de productos
            </h5>
          </div>
          <div className={`card-body ${this.state.bgColor}`}>
            <div className="row">
              {this.state.categories.map((category) => {
                return (
                  <CategoriesInDB
                    key={category.id}
                    name={category.type}
                    total={category.products.length}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const categories = await fetch(
      "http://localhost:3002/api/categories-products"
    ).catch((error) => {
      console.log(error);
    });
    const response = await categories.json();
    this.setState({ categories: response.data });
  }
}
export default ContentCategoriesInDB;
