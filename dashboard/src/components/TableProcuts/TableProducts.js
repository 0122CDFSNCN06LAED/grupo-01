import React, { Component } from "react";

class TableProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      page: 0,
      prevPage: false,
      nextPage: false,
    };
  }

  async productsOfDb() {
    const url = `http://localhost:3002/api/table-products?page=${this.state.page}`;

    const fetchApiProducts = await fetch(url).catch((error) => {
      console.log(error);
    });
    const response = await fetchApiProducts.json();

    this.setState({
      products: response.data,
      prevPage: response.meta.prevPage,
      nextPage: response.meta.nextPage,
    });
  }

  componentDidMount() {
    this.productsOfDb();
  }

  componentDidUpdate(prevProps, prevPage) {
    if (this.state.page !== prevPage.page) {
      this.productsOfDb();
    }
  }

  render() {
    return (
      <>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className="h3 mb-0 text-gray-800">
            All the products in Database
          </h5>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price $</th>
              <th scope="col">Region</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {/* ------ Aqui van los datos de la tabla products ------*/}
            {this.state.products.map((product) => {
              return (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.region}</td>
                  <td><img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "110rem" }}
              src= {product.image}
              alt={product.image}
            /></td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                </tr>
              );
            })}
            {/*------ Fin de los datos de la tabla products-------- */}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            disabled={!this.state.prevPage}
            onClick={() => {
              this.setState({
                page: this.state.page - 1,
              });
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <p className="p-3">Página : {this.state.page + 1}</p>
          <button
            className="btn btn-primary"
            disabled={!this.state.nextPage}
            onClick={() => {
              this.setState({
                page: this.state.page + 1,
              });
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </>
    );
  }
}

export default TableProductsList;
