import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_RESET,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_RESET,
  GET_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAILURE,
  REMOVE_ITEM_FROM_CART_REQUEST,
  REMOVE_ITEM_FROM_CART_RESET,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  UPDATE_ITEM_IN_CART_FAILURE,
  UPDATE_ITEM_IN_CART_REQUEST,
  UPDATE_ITEM_IN_CART_RESET,
  UPDATE_ITEM_IN_CART_SUCCESS,
} from "../constants/CartConstants";

export const getCartReducer = (
  state = {
    loading: false,
    cartData: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { loading: true };

    case GET_CART_SUCCESS:
      return { loading: false, cartData: action?.payload };

    case GET_CART_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_CART_RESET:
      return { cartData: undefined, loading: false };

    default:
      return state;
  }
};

export const addToCartReducer = (
  state = {
    loading: false,
    addSuccess: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true };

    case ADD_TO_CART_SUCCESS:
      return { loading: false, addSuccess: action?.payload };

    case ADD_TO_CART_FAILURE:
      return { loading: false, error: action?.payload };

    case ADD_TO_CART_RESET:
      return {};

    default:
      return state;
  }
};

export const updateItemInCartReducer = (
  state = {
    loading: false,
    updateSuccess: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_ITEM_IN_CART_REQUEST:
      return { loading: true };

    case UPDATE_ITEM_IN_CART_SUCCESS:
      return { loading: false, updateSuccess: action?.payload };

    case UPDATE_ITEM_IN_CART_FAILURE:
      return { loading: false, error: action?.payload };

    case UPDATE_ITEM_IN_CART_RESET:
      return {};

    default:
      return state;
  }
};

export const removeItemFromCartReducer = (
  state = {
    loading: false,
    removeSuccess: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case REMOVE_ITEM_FROM_CART_REQUEST:
      return { loading: true };

    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return { loading: false, removeSuccess: action?.payload };

    case REMOVE_ITEM_FROM_CART_FAILURE:
      return { loading: false, error: action?.payload };

    case REMOVE_ITEM_FROM_CART_RESET:
      return {};

    default:
      return state;
  }
};
