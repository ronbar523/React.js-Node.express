import React, { useEffect } from "react";
import {
  becomeBiz,
  getCurrentUser,
  logout,
} from "../../services/usersServices";
import { toast } from "react-toastify";
import { Navigate } from "react-router";


const BecomeBiz = () => {

  const user = getCurrentUser();

  const email = user.email 


  useEffect(() => {
    const user = {
      email: email,
      biz: true,
    };
    toast.success("Your Account Become A Business Account");
    becomeBiz(user);
    setTimeout(() => {
      logout();
      window.location = "/login";
    }, 1000);
  }, [email]);

  return <>{user?.biz && <Navigate to="/" />}</>;
};

export default BecomeBiz;
