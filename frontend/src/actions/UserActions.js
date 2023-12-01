import * as api from "../api/api";
import {
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_LIST_FAILURE,
  GET_USER_ADDRESS_LIST_REQUEST,
  GET_USER_ADDRESS_LIST_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
} from "../constants/UserConstants";

export const login = (userData) => async (dispatch) => {
  try {
    // dispatch action to initiate login
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // making the request using axios
    const { data } = await api.signIn(userData);

    // if successful, dispatch success and send data to reducer
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // store user details in local Storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // if request not successful initiate error and send error data to reducer
    const message = error?.response?.data;

    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: message,
    });
  }
};

export const register = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await api.register(userData);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    navigate("/login");
  } catch (error) {
    const message = JSON.parse(error?.response?.data);
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: message,
    });
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });

    const { data } = await api.logout();

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    dispatch({ type: USER_PROFILE_RESET });
    dispatch({ type: USER_REGISTER_RESET });
    dispatch({ type: USER_LOGIN_RESET });
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    localStorage.clear();
    navigate("/");
    window.location.reload();
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: USER_LOGOUT_FAILURE,
      payload: message,
    });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { data } = await api.getProfile();

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: USER_PROFILE_FAILURE,
      payload: message,
    });
  }
};

export const updateUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_PROFILE_REQUEST,
    });

    const { data } = await api.updateUser(userData);

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: message,
    });
  }
};

export const forgotPassword =
  (passwordDetails, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: USER_FORGOT_PASSWORD_REQUEST,
      });

      const { data } = await api.forgotPassword(passwordDetails);

      dispatch({
        type: USER_FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });

      navigate("/login");
    } catch (error) {
      const message = error?.response?.data;
      dispatch({
        type: USER_FORGOT_PASSWORD_FAILURE,
        payload: message,
      });
    }
  };

export const getAddressListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_ADDRESS_LIST_REQUEST,
    });

    const { data } = await api.getAddressList();

    dispatch({
      type: GET_USER_ADDRESS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_USER_ADDRESS_LIST_FAILURE,
      payload: message,
    });
  }
};

export const addAddressAction = (addressData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ADDRESS_REQUEST,
    });

    const { data } = await api.addAddress(addressData);

    dispatch({
      type: ADD_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: ADD_ADDRESS_FAILURE,
      payload: message,
    });
  }
};

export const deleteAddressAction = (addressID) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ADDRESS_REQUEST,
    });

    const { data } = await api.deleteAddress(addressID);

    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: DELETE_ADDRESS_FAILURE,
      payload: message,
    });
  }
};
