import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    groupByMonth: null,
    groupByWeek: null,
    groupByCategory: null
};

const slice = createSlice({
    name: "report",
    initialState,
    reducers: {
      startLoading(state) {
        state.isLoading = true;
      },
  
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      resetReports(state, action) {
        state.groupByMonth = [];
        state.groupByWeek = [];
        state.groupByCategory = [];
      },
  
      getReportsSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
  
        const { groupByCategory, groupByMonth, groupByWeek } = action.payload;
        state.groupByCategory = groupByCategory
        state.groupByMonth = groupByMonth
        state.groupByWeek = groupByWeek
      },
    },
  });
  
  export default slice.reducer;

  export const getReports = ({ wallet, fromDate, toDate }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { wallet, fromDate, toDate };
      const response = await apiService.get(`/report`, {
        params,
      });
      dispatch(slice.actions.resetReports());
      dispatch(slice.actions.getReportsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };