import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.Authorization = `Token ${JSON.parse(localStorage.getItem("userInfo")).token
      }`;
  }
  return req;
});

export const signIn = (formData) => API.post("users/login/", formData);

export const register = (formData) => API.post("users/signup/", formData);

export const logout = () => API.post("users/logout/");

export const getProfile = () => API.get("users/profile/");

export const updateUser = (userData) => API.post("users/update/", userData);

export const forgotPassword = (passwordDetails) =>
  API.post("users/forgotpassword/", passwordDetails);

export const getCategoryList = () => API.get("categories/list/");

export const getCategory = (id) => API.get(`categories/get/${id}/`);

export const addCategory = (categoryData) =>
  API.post("categories/add/", categoryData);

export const updateCategory = (categoryId, categoryData) =>
  API.put(`categories/update/${categoryId}/`, categoryData);

export const deleteCategory = (categoryId) =>
  API.delete(`categories/delete/${categoryId}/`);

export const addSubCategory = (formData) =>
  API.post("categories/subcategory/add/", formData);

export const getSubCategories = (categoryId) =>
  API.get(`categories/subcategories/${categoryId}/`);

export const deleteSubCategory = (subCategoryId) =>
  API.delete(`categories/subcategory/delete/${subCategoryId}/`);

export const getLatestProductList = (pageNo) =>
  API.get(`products/list/?page=${pageNo}`);

export const getProductDetails = (productId) =>
  API.get(`products/get/${productId}/`);

export const addProduct = (productData) =>
  API.post(`products/add/`, productData);

export const deleteProduct = (productId) =>
  API.delete(`products/delete/${productId}/`);

export const updateProduct = (productId, productData) =>
  API.patch(`products/update/${productId}/`, productData);

export const getFilteredProducts = (filterData, pageNo) =>
  API.post(`products/filtered/?page=${pageNo}`, {
    filters: filterData,
  });

export const getBrandList = (category_name) => API.get(`products/brands/${category_name === " " ? "qwertyuiopoiuytresxcvbhytfrghuhvdfgygvxdfgbjiytredcvhjk,mnbftyutresdfghj" : category_name}`);

export const getCart = () => API.get(`orders/cart/get/`);

export const addToCart = (productId, qty) =>
  API.post(`orders/cart/add/product/${productId}/qty/${qty}/`);

export const updateItemInCart = (cartItemId, qty) =>
  API.post(`orders/cart/update/item/${cartItemId}/qty/${qty}/`);

export const removeItemFromCart = (cartItemId) =>
  API.post(`orders/cart/delete/item/${cartItemId}/`);

export const getAllOrders = () => API.get(`orders/list/`);

export const getOrderById = (orderId) => API.get(`orders/id/${orderId}`);

export const updateOrderStatus = (orderId, orderStatus) =>
  API.post(`orders/status/orderId/${orderId}/status/${orderStatus}/`);

export const placeOrder = (addressID) =>
  API.get(`orders/create/address/${addressID}/`);

export const getOrderHistory = () => API.get(`orders/history/`);

export const getAddressList = () => API.get(`users/address/list/`);

export const addAddress = (addressData) =>
  API.post(`users/address/add/`, addressData);

export const deleteAddress = (addressID) =>
  API.delete(`users/address/delete/${addressID}/`);
