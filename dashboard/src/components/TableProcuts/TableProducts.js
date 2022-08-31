import React, { Component } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../assets/css/table.css";

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
      <div className="col-lg-12 mb-4">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className="h3 mb-0 text-gray-800 h3-table">
            All the products in Database
          </h5>
        </div>
        <Table className="table table-hover table-responsive-sm table-users-products table-md">
          <Thead>
            <Tr className="tr-table-margin-bottom">
              <Th scope="col">Id</Th>
              <Th scope="col">Name</Th>
              <Th scope="col">Description</Th>
              <Th scope="col">Price$</Th>
              <Th scope="col">Region</Th>
              <Th scope="col">Image</Th>
              <Th scope="col">Category</Th>
              <Th scope="col">Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* ------ Aqui van los datos de la tabla products ------*/}
            {this.state.products.map((product) => {
              return (
                <Tr key={product.id} className="tr-table-margin-bottom">
                  <Td scope="row">{product.id}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.description}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.region}</Td>
                  <Td>
                    <img
                      className="img-fluid px-3 px-sm-4 mt-3 mb-4 img-padding-cero"
                      style={{ width: "110rem" }}
                      src={product.image}
                      alt={product.image}
                    />
                  </Td>
                  <Td>{product.category}</Td>
                  <Td>{product.stock}</Td>
                </Tr>
              );
            })}
            {/*------ Fin de los datos de la tabla products-------- */}
          </Tbody>
        </Table>
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
      </div>
    );
  }
}

export default TableProductsList;
