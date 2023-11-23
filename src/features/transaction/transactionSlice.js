import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { TRANSACTIONS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  transactionById: {},
  currentPageTransactions: [],
  transactionByDate: []
};

const slice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetTransactions(state, action) {
      state.transactionById = {};
      state.currentPageTransactions = [];
    },

    getTransactionsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { items, total, fromDate, toDate } = action.payload;
      items.forEach((transs) => {
        transs.date = new Date(transs.date).toDateString();
        state.transactionById[transs._id] = transs;
        if (!state.currentPageTransactions.includes(transs._id))
          state.currentPageTransactions.push(transs._id);
      });

      function groupBy(objectArray, property) {
        return objectArray.reduce((accumulator, obj) => {
          const key = obj[property];
          const curGroup = accumulator[key] ?? [];

          return { ...accumulator, [key]: [...curGroup, obj] };
        }, []);
      }

      const tmpGroup = Object.entries(groupBy(items, "date"));
      state.transactionByDate = tmpGroup;
      state.totalTransactions = total;
      console.log("total : ", total)
      state.totalPages = Math.ceil(total / TRANSACTIONS_PER_PAGE);
    },

    createTransactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTransaction = action.payload;
      if (state.currentPageTransactions.length % TRANSACTIONS_PER_PAGE === 0)
        state.currentPageTransactions.pop();
      state.transactionById[newTransaction._id] = newTransaction;
      state.currentPageTransactions.unshift(newTransaction._id);
    },

    deleteTransactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("state", state.currentPageTransactions)
      const { items, count } = action.payload;
      console.log("items", items)
      items.forEach((item) => {
        state.transactionById[item._id] = item;
        console.log("123123", state.transactionById[item._id])
        if (!state.currentPageTransactions.includes(item._id))
          state.currentPageTransactions.push(item._id);
      });
      state.totalTransactions = count;
    },

    updateTransactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const changedTransaction = action.payload;
      if (state.currentPageTransactions.length % TRANSACTIONS_PER_PAGE === 0)
        state.transactionById[changedTransaction._id].content = changedTransaction.content;
      state.transactionById[changedTransaction._id].image = changedTransaction.image;
    },
  },
});

export default slice.reducer;

export const createTransaction =
  ({ wallet, category, date, amount, description }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.post("/transs", {
          "wallet": wallet,
          "category": category,
          "date": date,
          "amount": amount,
          "description": description
        });
        dispatch(slice.actions.createTransactionSuccess(response.data));
        toast.success("Create transaction successfully");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        console.log("error", error)
        toast.error(error.message);
      }
    };

export const getTransactions = ({ wallet, category, fromDate, toDate, description, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { wallet, category, fromDate, toDate, description, page, limit };
      const response = await apiService.get(`/transs`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetTransactions());
      dispatch(slice.actions.getTransactionsSuccess(response.data));

    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteTransaction =
  ({ _id, page, limit, fromDate, toDate }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {

        const params = { page, limit, fromDate, toDate };
        await apiService.delete(`/transs/${_id}`);
        toast.success("Delete Transaction successful");

        console.log("param 1", params)
        const response = await apiService.get(`/transs`, {
          params,
        })

        console.log("params delete: ", response)
        dispatch(slice.actions.resetTransactions());
        console.log("response.data", response.data)
        dispatch(slice.actions.deleteTransactionSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        console.log("error error", error)
        toast.error(error.message);
      }
    };

export const changeTransaction =
  ({ wallet, category, date, amount, description, _id }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.put(`/transs/${_id}`, {
          "wallet": wallet,
          "category": category,
          "date": date,
          "amount": amount,
          "description": description
        });
        dispatch(slice.actions.updateTransactionSuccess(response.data));
        toast.success("Update transaction successfully");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };