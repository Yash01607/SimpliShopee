import * as api from "../api/api";

import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../constants/OrderConstants";

export const getAllOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ORDER_LIST_REQUEST,
    });

    const { data } = await api.getAllOrders();

    dispatch({
      type: GET_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_ORDER_LIST_FAILURE,
      payload: message,
    });
  }
};

export const getOrderByIdAction = (orderID) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    const { data } = await api.getOrderById(orderID);

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_ORDER_FAILURE,
      payload: message,
    });
  }
};

export const updateOrderStatusAction =
  (orderID, orderStatus) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ORDER_STATUS_REQUEST,
      });

      const { data } = await api.updateOrderStatus(orderID, orderStatus);

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error?.response?.data;
      dispatch({
        type: UPDATE_ORDER_STATUS_FAILURE,
        payload: message,
      });
    }
  };

export const createOrderAction = (addressID, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const { data } = await api.placeOrder(addressID);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
    navigate(`/order/${data?.id}`);
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: message,
    });
  }
};

export const getOrderHistoryAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ORDER_HISTORY_REQUEST,
    });

    const { data } = await api.getOrderHistory();

    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload: message,
    });
  }
};
