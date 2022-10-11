import http from "./httpService";
import JWTDecode from "jwt-decode";
const URL = process.env.REACT_APP_SERVER_URL;
http.setHeaders("token", getJWT());

export function getJWT() {
  return localStorage.getItem("token");
}

export const crateNewUser = (user) => http.post(`${URL}/users/register`, user);


export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch (err) {
    return null;
  }
};

export const findUserByEmail = (email) =>
  http.get(`${URL}/users/find_by_email?email=` + email);


export const loginUser = async (user) => {
  const {
    data: { token },
  } = await http.post(`${URL}/users/login`, user);
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
  return (window.location = "/");
};

export const restPassword = async (email) => {
  http.post(`${URL}/users/reset_password`, email)
}

export const changePassword = async (email, num, password) => {
  http.patch(`${URL}/users/reset_password/${email}/${num}`, password);
}

export const userChangePassword = async (password) => {
  http.patch(`${URL}/users/change_password`, password);
};

export const verifyUser = async (email, verify) => {
  http.patch(`${URL}/users/verify/?email=${email}`, verify);
};

export const becomeBiz = async (user) => {
  http.patch(`${URL}/users/become_biz`, user);
};

export const deleteMyUser = (email) => http.delete(`${URL}/users/delete_my_user`, email);
