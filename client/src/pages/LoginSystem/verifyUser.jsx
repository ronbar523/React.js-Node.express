import React, { useEffect } from "react";
import {
  verifyUser,
  getCurrentUser,
} from "../../services/usersServices";
import { toast } from "react-toastify";
import { Navigate } from "react-router";


const VerifyUser = () => {

    const user = getCurrentUser();

    const url = window.location.href;
    const urlWordsArr = url.split("=");
    const email = urlWordsArr[1]

    useEffect(() => {
        const user = {
            verify: true,
        };
        toast.success("Your account Verify");
        verifyUser(email, user);
        window.location = '/login'
    }, [email])

   
    return <>{user && <Navigate to="/" />}</>;
}
 
export default VerifyUser;