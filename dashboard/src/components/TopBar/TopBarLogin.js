import React, { Component } from "react";

class TopBarLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  async userLog() {
    const userLogged = await fetch(
      "http://localhost:3002/api/user-logged"
    ).catch((error) => {
      console.log(error);
    });
    const response = await userLogged.json();

    this.setState({
      user: response.data,
    });
  }

  async componentDidMount() {
    this.userLog();
  }

  render() {
    if (!this.state.user) {
      return "Cargando...";
    }
    return (
      <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          {/* Jordan Walke */}
          {this.state.user.name}
        </span>
        <img
          className="img-profile rounded-circle"
          src={this.state.user.avatar}
          alt="Img avatar"
          width="60"
        />
      </a>
    );
  }
}

export default TopBarLogin;
