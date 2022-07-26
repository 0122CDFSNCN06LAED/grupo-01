import React, { Component } from "react";
import ContentCategoriesInDB from "../ContentCategoriesInDb/ContentCategoriesInDb";
import ContenRowProducts from "../ContentRowProducts/ContenRowProducts";
import LastsProductsInDB from "../LastsProductsInDB/LastsproductsInDB";

class ContentRowTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  render() {
    if (!this.state.products) {
      return "Cargando...";
    }
    return (
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">App Coffe House Dashboard</h1>
        </div>

        <ContenRowProducts />

        <div className="row">
          <LastsProductsInDB
            key={this.state.products.id}
            title={"Lo último de Coffee House"}
            image={this.state.products.image}
            description={this.state.products.description}
          />
          <ContentCategoriesInDB />
        </div>
      </div>
    );
  }
  async componentDidMount() {
    const products = await fetch(
      "http://localhost:3002/api/table-products"
    ).catch((error) => {
      console.log(error);
    });

    const response = await products.json();
    this.setState({
      products: response.data.reduce((acc, value) => {
        return value;
      }),
    });
  }
}

export default ContentRowTop;
