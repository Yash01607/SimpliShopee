import * as api from "../api/api";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_BRAND_LIST_FAILURE,
  GET_BRAND_LIST_REQUEST,
  GET_BRAND_LIST_SUCCESS,
  GET_FILTERED_PRODUCTS_LIST_FAILURE,
  GET_FILTERED_PRODUCTS_LIST_REQUEST,
  GET_FILTERED_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/ProductConstants";

export const getLatestProductListAction = (pageNo) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_LIST_REQUEST,
    });

    const { data } = await api.getLatestProductList(pageNo);

    dispatch({
      type: GET_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_PRODUCT_LIST_FAILURE,
      payload: message,
    });
  }
};

export const getFilteredProductsAction =
  (filterData, pageNo) => async (dispatch) => {
    try {
      dispatch({
        type: GET_FILTERED_PRODUCTS_LIST_REQUEST,
      });

      const { data } = await api.getFilteredProducts(filterData, pageNo);

      dispatch({
        type: GET_FILTERED_PRODUCTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error?.response?.data;
      dispatch({
        type: GET_FILTERED_PRODUCTS_LIST_FAILURE,
        payload: message,
      });
    }
  };

export const getProductDetailsAction = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await api.getProductDetails(productId);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_PRODUCT_DETAILS_FAILURE,
      payload: message,
    });
  }
};

export const addProductAction = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_PRODUCT_REQUEST,
    });

    const { data } = await api.addProduct(productData);

    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      payload: message,
    });
  }
};

export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await api.deleteProduct(productId);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: message,
    });
  }
};

export const updateProductAction =
  (productId, productData) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });

      const { data } = await api.updateProduct(productId, productData);

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error?.response?.data;
      dispatch({
        type: UPDATE_PRODUCT_FAILURE,
        payload: message,
      });
    }
  };

export const getBrandListAction = (category_name) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BRAND_LIST_REQUEST,
    });

    const { data } = await api.getBrandList(category_name);

    dispatch({
      type: GET_BRAND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_BRAND_LIST_FAILURE,
      payload: message,
    });
  }
};
