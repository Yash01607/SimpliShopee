import * as api from "../api/api";
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAILURE,
  REMOVE_ITEM_FROM_CART_REQUEST,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  UPDATE_ITEM_IN_CART_FAILURE,
  UPDATE_ITEM_IN_CART_REQUEST,
  UPDATE_ITEM_IN_CART_SUCCESS,
} from "../constants/CartConstants";

export const getCartAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CART_REQUEST,
    });

    const { data } = await api.getCart();

    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_CART_FAILURE,
      payload: message,
    });
  }
};

export const addToCartAction = (productId, qty) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TO_CART_REQUEST,
    });

    const { data } = await api.addToCart(productId, qty);

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: ADD_TO_CART_FAILURE,
      payload: message,
    });
  }
};

export const updateItemInCartAction = (cartItemId, qty) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ITEM_IN_CART_REQUEST,
    });

    const { data } = await api.updateItemInCart(cartItemId, qty);

    dispatch({
      type: UPDATE_ITEM_IN_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: UPDATE_ITEM_IN_CART_FAILURE,
      payload: message,
    });
  }
};

export const removeItemFromCartAction = (cartItemId) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_REQUEST,
    });

    const { data } = await api.removeItemFromCart(cartItemId);

    dispatch({
      type: REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: REMOVE_ITEM_FROM_CART_FAILURE,
      payload: message,
    });
  }
};
