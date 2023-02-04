import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { CATEGORIES_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  categoryById: {},
  currentPageCategories: []
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetCategories(state, action) {
      state.categoryById = {};
      state.currentPageCategories = [];
    },

    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { items, total } = action.payload;
      items.forEach((category) => {
        state.categoryById[category._id] = category;
        if (!state.currentPageCategories.includes(category._id))
          state.currentPageCategories.push(category._id);
      });

      state.totalCategories = total;
      state.totalPages = Math.ceil(total/CATEGORIES_PER_PAGE);
    },

    createCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newCategory = action.payload;
      if (state.currentPageCategories.length % CATEGORIES_PER_PAGE === 0)
        state.currentPageCategories.pop();
      state.categoryById[newCategory._id] = newCategory;
      state.currentPageCategories.unshift(newCategory._id);
    },

    deleteCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { categories, total } = action.payload;
      categories.forEach((category) => {
        state.categoryById[category._id] = category;
        if (!state.currentPageCategories.includes(category._id))
          state.currentPageCategories.push(category._id);
      });
      state.totalCategories = total;
    },

    updateCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const changedTransaction = action.payload;
      if (state.currentPageTransactions.length % CATEGORIES_PER_PAGE === 0)
      state.transactionById[changedTransaction._id].content = changedTransaction.content;
      state.transactionById[changedTransaction._id].image = changedTransaction.image;
    },
  },
});

export default slice.reducer;

export const createCategory=
  ({ category, classification }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/categories", {
        "name": category,
        "classification": classification,
      });
      dispatch(slice.actions.createCategorySuccess(response.data));
      toast.success("Create category successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getCategories =
  ( page, limit ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/categories`, {
        params,
      });
      dispatch(slice.actions.resetCategories());
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const deleteCategory =
  ( _id, page, limit) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const params = { page, limit };
      await apiService.delete(`/categories/${_id}`);
      toast.success("Delete category successful");

      const response = await apiService.get(`/categories`, {
        params,
      })
      dispatch(slice.actions.resetCategories());
      dispatch(slice.actions.deleteCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const changeCategory =
  ({_id, name, classification}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/categories/${_id}`, {
        "name": name,
        "classification": classification
      });
      dispatch(slice.actions.updateCategorySuccess(response.data));
      toast.success("Update category successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };