import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/icons/logo-horizontal.svg";

function Sidebar(props) {
  return (
    <ul
      className="navbar-nav sidebar sidebar-dark accordion"
      id="accordionSidebar"
      style={props.style}
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        href="http://localhost:3002/"
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div className="sidebar-brand-icon">
          <img className="w-100" src={logo} alt="img Coffee House" />
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <NavLink to="/" exact activeClassName="active" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard - CoffeeHouse</span>
        </NavLink>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Actions</div>

      {/* <!-- Nav Item - Pages --> */}
      <li className="nav-item">
        <NavLink
          to="/products"
          exact
          activeClassName="active"
          className="nav-link collapsed"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Products</span>
        </NavLink>
      </li>

      {/* <!-- Nav Item - Charts --> */}
      <li className="nav-item">
        <NavLink
          to="/last-products"
          exact
          activeClassName="active"
          className="nav-link"
        >
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Last product</span>
        </NavLink>
      </li>

      {/* <!-- Nav Item - Tables Products--> */}
      <li className="nav-item">
        <NavLink
          to="/table-products"
          exact
          activeClassName="active"
          className="nav-link"
        >
          <i className="fas fa-fw fa-table"></i>
          <span>List products</span>
        </NavLink>
      </li>
      {/* <!-- Nav Item - Tables Users--> */}
      <li className="nav-item">
        <NavLink
          to="/table-users"
          exact
          activeClassName="active"
          className="nav-link"
        >
          <i className="fas fa-fw fa-table"></i>
          <span>List users</span>
        </NavLink>
      </li>

      {/* <!-- Divider --> */}

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default Sidebar;
