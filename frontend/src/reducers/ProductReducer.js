import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_RESET,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  GET_BRAND_LIST_FAILURE,
  GET_BRAND_LIST_REQUEST,
  GET_BRAND_LIST_RESET,
  GET_BRAND_LIST_SUCCESS,
  GET_FILTERED_PRODUCTS_LIST_FAILURE,
  GET_FILTERED_PRODUCTS_LIST_REQUEST,
  GET_FILTERED_PRODUCTS_LIST_RESET,
  GET_FILTERED_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_RESET,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_RESET,
  GET_PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/ProductConstants";

export const getLatestProductListReducer = (
  state = {
    loading: false,
    latestProductList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_REQUEST:
      return { loading: true };

    case GET_PRODUCT_LIST_SUCCESS:
      return { loading: false, latestProductList: action?.payload };

    case GET_PRODUCT_LIST_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_PRODUCT_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const getProductDetailsReducer = (
  state = {
    loading: false,
    productDetails: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, productDetails: action?.payload };

    case GET_PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_PRODUCT_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const addProductReducer = (
  state = {
    loading: false,
    addProductDetail: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };

    case ADD_PRODUCT_SUCCESS:
      return { loading: false, addProductDetail: action?.payload };

    case ADD_PRODUCT_FAILURE:
      return { loading: false, error: action?.payload };

    case ADD_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteProductReducer = (
  state = {
    loading: false,
    deleteProductStatus: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };

    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, deleteProductStatus: action?.payload };

    case DELETE_PRODUCT_FAILURE:
      return { loading: false, error: action?.payload };

    case DELETE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const updateProductReducer = (
  state = {
    loading: false,
    productDetails: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };

    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, productDetails: action?.payload };

    case UPDATE_PRODUCT_FAILURE:
      return { loading: false, error: action?.payload };

    case UPDATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const getFilteredProductListReducer = (
  state = {
    loading: false,
    productList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_FILTERED_PRODUCTS_LIST_REQUEST:
      return { loading: true };

    case GET_FILTERED_PRODUCTS_LIST_SUCCESS:
      return { loading: false, productList: action?.payload };

    case GET_FILTERED_PRODUCTS_LIST_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_FILTERED_PRODUCTS_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const getBrandListReducer = (
  state = {
    loading: false,
    brandList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_BRAND_LIST_REQUEST:
      return { loading: true };

    case GET_BRAND_LIST_SUCCESS:
      return { loading: false, brandList: action?.payload };

    case GET_BRAND_LIST_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_BRAND_LIST_RESET:
      return {};

    default:
      return state;
  }
};
