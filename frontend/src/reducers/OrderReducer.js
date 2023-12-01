import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_RESET,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_RESET,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_RESET,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_RESET,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../constants/OrderConstants";

export const getAllOrderListReducer = (
  state = {
    loading: false,
    orderList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_ORDER_LIST_REQUEST:
      return { loading: true };

    case GET_ORDER_LIST_SUCCESS:
      return { loading: false, orderList: action?.payload };

    case GET_ORDER_LIST_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_ORDER_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const getOrderByIdReducer = (
  state = {
    loading: false,
    orderDetails: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true };

    case GET_ORDER_SUCCESS:
      return { loading: false, orderDetails: action?.payload };

    case GET_ORDER_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

export const updateOrderStatusReducer = (
  state = {
    loading: false,
    updateStatus: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return { loading: true };

    case UPDATE_ORDER_STATUS_SUCCESS:
      return { loading: false, updateStatus: action?.payload };

    case UPDATE_ORDER_STATUS_FAILURE:
      return { loading: false, error: action?.payload };

    case UPDATE_ORDER_STATUS_RESET:
      return {};

    default:
      return state;
  }
};

export const createOrderReducer = (
  state = {
    loading: false,
    createOrderStatus: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };

    case CREATE_ORDER_SUCCESS:
      return { loading: false, createOrderStatus: action?.payload };

    case CREATE_ORDER_FAILURE:
      return { loading: false, error: action?.payload };

    case CREATE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

export const getOrderHistoryReducer = (
  state = {
    loading: false,
    orderList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_ORDER_HISTORY_REQUEST:
      return { loading: true };

    case GET_ORDER_HISTORY_SUCCESS:
      return { loading: false, orderList: action?.payload };

    case GET_ORDER_HISTORY_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_ORDER_HISTORY_RESET:
      return {};

    default:
      return state;
  }
};
