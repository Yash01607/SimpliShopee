import {
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_RESET,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_RESET,
  ADD_SUB_CATEGORY_REQUEST,
  ADD_SUB_CATEGORY_SUCCESS,
  ADD_SUB_CATEGORY_FAILURE,
  ADD_SUB_CATEGORY_RESET,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_FAILURE,
  GET_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAILURE,
  DELETE_SUB_CATEGORY_RESET,
} from "../constants/CategoryConstants";

export const getCategoryListReducer = (
  state = {
    loading: false,
    categoryList: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categoryListData: action?.payload };

    case CATEGORY_LIST_FAILURE:
      return { loading: false, error: action?.payload };

    case CATEGORY_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const addCategoryReducer = (
  state = {
    loading: false,
    category: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return { loading: true };

    case ADD_CATEGORY_SUCCESS:
      return { loading: false, category: action?.payload };

    case ADD_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case ADD_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const updateCategoryReducer = (
  state = {
    loading: false,
    category: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true };

    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, category: action?.payload };

    case UPDATE_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case UPDATE_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const getCategoryReducer = (
  state = {
    loading: false,
    category: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true };

    case GET_CATEGORY_SUCCESS:
      return { loading: false, category: action?.payload };

    case GET_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteCategoryReducer = (
  state = {
    loading: false,
    deleteSuccess: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };

    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, deleteSuccess: true };

    case DELETE_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case DELETE_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const addSubCategoryReducer = (
  state = {
    loading: false,
    subCategory: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case ADD_SUB_CATEGORY_REQUEST:
      return { loading: true };

    case ADD_SUB_CATEGORY_SUCCESS:
      return { loading: false, subCategory: action?.payload };

    case ADD_SUB_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case ADD_SUB_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const getSubCategoriesReducer = (
  state = {
    loading: false,
    subCategories: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_REQUEST:
      return { loading: true };

    case GET_SUB_CATEGORY_SUCCESS:
      return { loading: false, subCategories: action?.payload };

    case GET_SUB_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case GET_SUB_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteSubCategoryReducer = (
  state = {
    loading: false,
    deleteSuccess: undefined,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case DELETE_SUB_CATEGORY_REQUEST:
      return { loading: true };

    case DELETE_SUB_CATEGORY_SUCCESS:
      return { loading: false, deleteSuccess: true };

    case DELETE_SUB_CATEGORY_FAILURE:
      return { loading: false, error: action?.payload };

    case DELETE_SUB_CATEGORY_RESET:
      return {};

    default:
      return state;
  }
};
