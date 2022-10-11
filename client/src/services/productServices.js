import http from "./httpService";
const URL = process.env.REACT_APP_SERVER_URL;

//POST
export const createNewProduct = (product) =>
  http.post(`${URL}/products/create`, product);

//GET

export const getAllProducts = () => http.get(`${URL}/products/find`); 

export const getThreeProducts = () => http.get(`${URL}/products/find_three`); 

export const getProductById = (id) => http.get(`${URL}/products/find/${id}`); 

export const getProductsByCategory = (category) =>
  http.get(`${URL}/products/find_by_category/${category}`);

export const getMyProducts = () => http.get(`${URL}/products/find/my_products`);


//DELETE
export const deleteProductById = (id) =>
  http.delete(`${URL}/products/delete/${id}`);

export const deleteAllMyProducts = () =>
  http.delete(`${URL}/products/delete_my_products`);

//PUT
export const updateProductById = (id, product) =>
  http.put(`${URL}/products/update/${id}`, product);

  
