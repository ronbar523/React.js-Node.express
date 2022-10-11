import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./NavbarComponents/logo";
import { getCurrentUser } from "../../services/usersServices";
import UserNavbar from "./NavbarComponents/userNavbar";
import BizUser from "./NavbarComponents/bizUser";
import Register from "./NavbarComponents/register";
import Login from "./NavbarComponents/login";

const Navbar = ({ theme }) => {

  const user = getCurrentUser()


  return (
    <div
      className=" navbar navbar-expand-md navbar-dark"
      aria-label="Fourth navbar example"
    >
      <div
        className={
          theme
            ? "container-fluid ms-4 text-sm-center text-md-center bg-myColor-dark z-position"
            : "container-fluid ms-4 text-sm-center text-md-center bg-myColor z-position"
        }
      >
        <Logo theme={theme} />
        <button
          className="navbar-toggler collapsed mt-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto ms-lg-5 ms-xl-5  mb-2 mb-md-0 fs-5 myNavbar">
            <li className="li-nav">
              <NavLink
                className={theme ? "line-dark-nav" : "line"}
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="li-nav">
              <NavLink
                className={theme ? "line-dark-nav" : "line"}
                aria-current="page"
                to="/categories"
              >
                Shop
              </NavLink>
            </li>
          </ul>
          {(user && user.biz) || (user && user.admin) ? (
            <BizUser theme={theme} />
          ) : null}

          {user && !user.biz && !user.admin ? (
            <UserNavbar theme={theme} />
          ) : null}

          <ul className="navbar-nav me-lg-5 me-xl-5 mb-2 mb-md-0 fs-5">
            {!user ? <Register theme={theme} /> : null}

            {!user ? <Login theme={theme} /> : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
