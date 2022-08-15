import React, { Component } from "react";

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
          <h5 className="h3 mb-0 text-gray-800">All the users in Database</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Avatar</th>
                <th scope="col">User category</th>
              </tr>
            </thead>
            <tbody>
              {/* ------ Aqui van los datos de la tabla products ------*/}
              {this.state.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>
                      <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style={{ width: "8rem" }}
                        src={user.avatar}
                        alt={user.avatar}
                      />
                    </td>
                    <td>{user.category}</td>
                  </tr>
                );
              })}
              {/*------ Fin de los datos de la tabla products-------- */}
            </tbody>
          </table>
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
