import http from "./httpService";
const URL = process.env.REACT_APP_SERVER_URL;

//POST
export const createNewDetails = (details) =>
  http.post(`${URL}/users_details/create`, details);

//GET

export const getDetailsById = (id) => http.get(`${URL}/users_details/find/${id}`);

export const getMyDetails = () => http.get(`${URL}/users_details/find/my_details`);

//DELETE
export const deleteDetailsById = (id) =>
  http.delete(`${URL}/users_details/delete/${id}`);

export const deleteAllMyDetails = () =>
  http.delete(`${URL}/users_details/delete/all_my_details`);

//PUT
export const updateDetailsById = (id, product) =>
  http.put(`${URL}/users_details/update/${id}`, product);
