import { combineReducers } from "redux";

import {
  addAddressReducer,
  deleteAddressReducer,
  getUserAddressListReducer,
  updateUserProfileReducer,
  userForgotPasswordReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
} from "./UserReducer";

import {
  addCategoryReducer,
  addSubCategoryReducer,
  deleteCategoryReducer,
  deleteSubCategoryReducer,
  getCategoryListReducer,
  getCategoryReducer,
  getSubCategoriesReducer,
  updateCategoryReducer,
} from "./CategoryReducer";
import {
  addProductReducer,
  deleteProductReducer,
  getBrandListReducer,
  getFilteredProductListReducer,
  getLatestProductListReducer,
  getProductDetailsReducer,
  updateProductReducer,
} from "./ProductReducer";
import {
  addToCartReducer,
  getCartReducer,
  removeItemFromCartReducer,
  updateItemInCartReducer,
} from "./CartReducer";
import {
  createOrderReducer,
  getAllOrderListReducer,
  getOrderByIdReducer,
  getOrderHistoryReducer,
  updateOrderStatusReducer,
} from "./OrderReducer";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  getCategory: getCategoryReducer,
  categoryList: getCategoryListReducer,
  addCategory: addCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  addSubcategory: addSubCategoryReducer,
  getSubCategories: getSubCategoriesReducer,
  deleteSubCategories: deleteSubCategoryReducer,
  getLatestProductList: getLatestProductListReducer,
  getProductDetails: getProductDetailsReducer,
  addProduct: addProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  getFilteredProductList: getFilteredProductListReducer,
  getBrandList: getBrandListReducer,
  getCart: getCartReducer,
  addToCart: addToCartReducer,
  updateItemInCart: updateItemInCartReducer,
  removeItemFromCart: removeItemFromCartReducer,
  getAllOrderList: getAllOrderListReducer,
  getOrderById: getOrderByIdReducer,
  updateOrderStatus: updateOrderStatusReducer,
  createOrder: createOrderReducer,
  getUserAddressList: getUserAddressListReducer,
  addAddress: addAddressReducer,
  deleteAddress: deleteAddressReducer,
  updateUserProfile: updateUserProfileReducer,
  getOrderHistory: getOrderHistoryReducer,
});
