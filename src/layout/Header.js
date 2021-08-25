import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { profile } = props;

  const { first_name, last_name, organization_name } = profile;
  return (
    <div className="row">
      <div className="col-md-12">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <em className="navbar-brand" style={{ flex: 1 }}>
                {organization_name}
              </em>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textTransform: "capitalize" }}
                >
                  {first_name} {last_name} &nbsp;&nbsp;
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link to="/hospital" className="dropdown-item" href="#">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hospital/user-profile"
                      className="dropdown-item"
                      href="#"
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className="dropdown-item" href="#">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
