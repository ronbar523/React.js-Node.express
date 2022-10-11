import React from "react";
import { NavLink } from "react-router-dom";

const UserNavbar = ({ theme }) => {
  return (
    <li className="li-nav nav-item dropdown nav-arrow">
      <NavLink
        className={
          theme ? "dropdown-toggle my-user" : "dropdown-toggle my-user-light"
        }
        role="button"
        aria-current="page"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        to="/"
      >
        My User
      </NavLink>
      <ul className="dropdown-menu">
        <li className="li-nav mt-1">
          <NavLink
            className="user-line text-dark"
            aria-current="page"
            to="/my_cart"
          >
            My Cart
          </NavLink>
        </li>
        <li className="li-nav mt-1">
          <NavLink
            className="user-line text-dark"
            aria-current="page"
            to="/my_favorite"
          >
            My Favorite
          </NavLink>
        </li>

        <li className="li-nav mt-1">
          <NavLink
            className="user-line text-dark"
            aria-current="page"
            to="/become_biz"
          >
            Become Biz
          </NavLink>
        </li>
        <li className="li-nav mt-1">
          <NavLink
            className="user-line text-dark"
            aria-current="page"
            to="/change_password"
          >
            Change Pass
          </NavLink>
        </li>
        <li className="li-nav mt-1">
          <NavLink
            className="user-line text-dark"
            aria-current="page"
            to="/delete_account"
          >
            Delete User
          </NavLink>
        </li>
        <li className="li-nav li-user">
          <NavLink
            className="text-dark user-line"
            aria-current="page"
            to="/logout"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default UserNavbar;
