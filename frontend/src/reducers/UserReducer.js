import {
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_RESET,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_RESET,
  DELETE_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_LIST_FAILURE,
  GET_USER_ADDRESS_LIST_REQUEST,
  GET_USER_ADDRESS_LIST_RESET,
  GET_USER_ADDRESS_LIST_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_RESET,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
} from "../constants/UserConstants";

export const userLoginReducer = (
  state = {
    loading: false,
    userData: JSON.parse(localStorage.getItem("userInfo")) || undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userData: action?.payload };

    case USER_LOGIN_FAILURE:
      return { loading: false, error: action?.payload };

    case USER_LOGIN_RESET:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = {
    loading: false,
    userData: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userData: action?.payload };

    case USER_REGISTER_FAILURE:
      return { loading: false, error: action?.payload };

    case USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

export const userProfileReducer = (
  state = {
    loading: false,
    profileData: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };

    case USER_PROFILE_SUCCESS:
      return { loading: false, profileData: action?.payload };

    case USER_PROFILE_FAILURE:
      return { loading: false, error: action?.payload };

    case USER_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const updateUserProfileReducer = (
  state = {
    loading: false,
    updateStatus: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return { loading: true };

    case UPDATE_USER_PROFILE_SUCCESS:
      return { loading: false, updateStatus: action?.payload };

    case UPDATE_USER_PROFILE_FAILURE:
      return { loading: false, error: action?.payload };

    case UPDATE_USER_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userForgotPasswordReducer = (
  state = {
    loading: false,
    passwordUpdateResult: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };

    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, passwordUpdateResult: action?.payload };

    case USER_FORGOT_PASSWORD_FAILURE:
      return { loading: false, error: action?.payload };

    case USER_FORGOT_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};

export const getUserAddressListReducer = (
  state = {
    loading: false,
    addressList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_USER_ADDRESS_LIST_REQUEST:
      return { loading: true };

    case GET_USER_ADDRESS_LIST_SUCCESS:
      return { loading: false, addressList: action?.payload };

    case GET_USER_ADDRESS_LIST_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_USER_ADDRESS_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const addAddressReducer = (
  state = {
    loading: false,
    addressData: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case ADD_ADDRESS_REQUEST:
      return { loading: true };

    case ADD_ADDRESS_SUCCESS:
      return { loading: false, addressData: action?.payload };

    case ADD_ADDRESS_FAILURE:
      return { loading: false, error: action?.payload };

    case ADD_ADDRESS_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteAddressReducer = (
  state = {
    loading: false,
    deleteSuccess: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case DELETE_ADDRESS_REQUEST:
      return { loading: true };

    case DELETE_ADDRESS_SUCCESS:
      return { loading: false, deleteSuccess: action?.payload };

    case DELETE_ADDRESS_FAILURE:
      return { loading: false, error: action?.payload };

    case DELETE_ADDRESS_RESET:
      return {};

    default:
      return state;
  }
};
