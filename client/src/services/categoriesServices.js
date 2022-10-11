import http from "./httpService";
const URL = process.env.REACT_APP_SERVER_URL;


export const getAllCategory = () => http.get(`${URL}/categories/find_all_categories`); 

export const getCategoryById = (id) => http.get(`${URL}/categories/find/${id}`); 

export const deleteCategoryById = (id) => http.delete(`${URL}/categories/delete/${id}`);

export const createNewCategory = (category) =>
  http.post(`${URL}/categories/create_category`, category);

export const updateCategoryById = (id, category) =>
  http.put(`${URL}/categories/update/${id}`, category);
