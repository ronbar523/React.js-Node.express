import React from "react";
import { NavLink } from "react-router-dom";

const Login = ({ theme }) => {
  return (
    <li className="li-nav li-user">
      <NavLink
        className={theme ? "line-dark-nav" : "line"}
        aria-current="page"
        to="/login"
      >
        Login
      </NavLink>
    </li>
  );
};

export default Login;
