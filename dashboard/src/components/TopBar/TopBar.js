import React from "react";
import TopBarLogin from "./TopBarLogin";

function TopBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <TopBarLogin />
        </li>
      </ul>
    </nav>
  );
}

export default TopBar;
