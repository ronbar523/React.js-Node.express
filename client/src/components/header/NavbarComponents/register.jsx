import React from "react";
import { NavLink } from "react-router-dom";

const Register = ({theme}) => {
    return ( 
       <li className="li-nav">
         <NavLink
          className={theme ? "line-dark-nav" : "line"}
          aria-current="page"
          to="/register"> 
            Register
         </NavLink>
        </li>
    )
}
 
export default Register;