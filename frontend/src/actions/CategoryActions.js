import * as api from "../api/api";
import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_SUB_CATEGORY_FAILURE,
  ADD_SUB_CATEGORY_REQUEST,
  ADD_SUB_CATEGORY_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAILURE,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_FAILURE,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/CategoryConstants";

export const getCategoryList = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    const { data } = await api.getCategoryList();

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: CATEGORY_LIST_FAILURE,
      payload: message,
    });
  }
};

export const getCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });

    const { data } = await api.getCategory(id);

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_CATEGORY_FAILURE,
      payload: message,
    });
  }
};

export const addCategoryAction = (categoryData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CATEGORY_REQUEST,
    });

    const { data } = await api.addCategory(categoryData);

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: ADD_CATEGORY_FAILURE,
      payload: message,
    });
  }
};

export const updateCategoryAction =
  (categoryID, categoryData) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_CATEGORY_REQUEST,
      });

      const { data } = await api.updateCategory(categoryID, categoryData);
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error?.response?.data;
      dispatch({
        type: UPDATE_CATEGORY_FAILURE,
        payload: message,
      });
    }
  };

export const deleteCategoryAction = (categoryID) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });

    const { data } = await api.deleteCategory(categoryID);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: DELETE_CATEGORY_FAILURE,
      payload: message,
    });
  }
};

export const addSubCategoryAction = (subCategoryData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SUB_CATEGORY_REQUEST,
    });

    const { data } = await api.addSubCategory(subCategoryData);

    dispatch({
      type: ADD_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: ADD_SUB_CATEGORY_FAILURE,
      payload: message,
    });
  }
};

export const getSubCategoriesAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUB_CATEGORY_REQUEST,
    });

    const { data } = await api.getSubCategories(id);

    dispatch({
      type: GET_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: GET_SUB_CATEGORY_FAILURE,
      payload: message,
    });
  }
};

export const deleteSubCategoryAction = (subCategoryID) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SUB_CATEGORY_REQUEST,
    });

    const { data } = await api.deleteSubCategory(subCategoryID);

    dispatch({
      type: DELETE_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error?.response?.data;
    dispatch({
      type: DELETE_SUB_CATEGORY_FAILURE,
      payload: message,
    });
  }
};
