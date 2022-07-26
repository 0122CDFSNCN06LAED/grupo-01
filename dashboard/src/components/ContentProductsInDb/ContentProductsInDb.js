import React, { Component } from "react";
import ProductsInDB from "../Products/ProductsInDB";

class ContentProductsInDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      bgColor: "",
      image: "",
    };
  }

  render() {
    if (!this.state.products && !this.state.image) {
      return "Cargando...";
    }

    return (
      <div className="col-lg-12 mb-4">
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
              Todos los productos
            </h5>
          </div>
          <div className={`card-body ${this.state.bgColor}`}>
            <div className="row">
              {this.state.products.map((product) => {
                return (
                  <ProductsInDB
                    key={product.id}
                    title={product.name}
                    description={product.description}
                    image={product.image}
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
    const url = "http://localhost:3002/api/table-products";
    const products = await fetch(url).catch((error) => {
      console.log(error);
    });
    const response = await products.json();

    this.setState({
      products: response.data,
    });
  }
}

// const imageUrl = url;

// (async () => {
//   const response = await fetch(imageUrl);
//   const imageBlob = await response.blob();
//   const reader = new FileReader();
//   reader.readAsDataURL(imageBlob);
//   reader.onloadend = () => {
//     const base64data = reader.result;
//     console.log(base64data);
//   };
// })();

export default ContentProductsInDB;
