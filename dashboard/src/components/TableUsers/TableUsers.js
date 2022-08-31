import React, { Component } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../assets/css/table.css";

class TableUsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      page: 0,
      prevPage: false,
      nextPage: false,
    };
  }

  async usersListOfDb() {
    const url = `http://localhost:3002/api/table-users?page=${this.state.page}`;

    const fetchApiusers = await fetch(url).catch((error) => {
      console.log(error);
    });
    const response = await fetchApiusers.json();

    this.setState({
      users: response.data,
      prevPage: response.meta.prevPage,
      nextPage: response.meta.nextPage,
    });
  }

  componentDidMount() {
    this.usersListOfDb();
  }

  componentDidUpdate(prevProps, prevPage) {
    if (this.state.page !== prevPage.page) {
      this.usersListOfDb();
    }
  }

  render() {
    return (
      <div className="col-lg-12 mb-4">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className="h3 mb-0 text-gray-800 h3-table">
            All the users in Database
          </h5>
        </div>
        <div className="table-responsive">
          <Table className="table table-hover table-responsive-sm table-users-products table-md">
            <Thead>
              <Tr className="tr-table-margin-bottom">
                <Th scope="col">Id</Th>
                <Th scope="col">Name</Th>
                <Th scope="col">Lastname</Th>
                <Th scope="col">Email</Th>
                <Th scope="col">Username</Th>
                <Th scope="col">Avatar</Th>
                <Th scope="col">User category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* ------ Aqui van los datos de la tabla products ------*/}
              {this.state.users.map((user) => {
                return (
                  <Tr key={user.id} className="tr-table-margin-bottom">
                    <Td scope="row">{user.id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.lastname}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.username}</Td>
                    <Td>
                      <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4 img-padding-cero"
                        style={{ width: "8rem" }}
                        src={user.avatar}
                        alt={user.avatar}
                      />
                    </Td>
                    <Td>{user.category}</Td>
                  </Tr>
                );
              })}
              {/*------ Fin de los datos de la tabla products-------- */}
            </Tbody>
          </Table>
        </div>
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

export default TableUsersList;
