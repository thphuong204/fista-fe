import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { WALLETS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  walletById: {},
  currentPageWallets: []
};

const slice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetWallets(state, action) {
      state.walletById = {};
      state.currentPageWallets = [];
    },

    getWalletsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { items, total } = action.payload;
      items.forEach((wallet) => {
        state.walletById[wallet._id] = wallet;
        if (!state.currentPageWallets.includes(wallet._id))
          state.currentPageWallets.push(wallet._id);
      });

      state.totalWallets = total;
    },

    createWalletSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTransaction = action.payload;
      if (state.currentPageWallets.length % WALLETS_PER_PAGE === 0)
        state.currentPageWallets.pop();
      state.walletById[newTransaction._id] = newTransaction;
      state.currentPageWallets.unshift(newTransaction._id);
    },

    deleteWalletSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { transactions, count } = action.payload;
      transactions.forEach((transs) => {
        state.walletById[transs._id] = transs;
        if (!state.currentPageWallets.includes(transs._id))
          state.currentPageWallets.push(transs._id);
      });
      state.totalWallets = count;
    },

    updateWalletSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const changedTransaction = action.payload;
      if (state.currentPageWallets.length % WALLETS_PER_PAGE === 0)
      state.walletById[changedTransaction._id].content = changedTransaction.content;
      state.walletById[changedTransaction._id].image = changedTransaction.image;
    },
  },
});

export default slice.reducer;

export const createWallet =
  ({ wallet, classification }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/wallets", {
        "name": wallet,
        "classification": classification,
      });
      dispatch(slice.actions.createWalletSuccess(response.data));
      toast.success("Create transaction successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getWallets =
  ( user, page, limit ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { user, page, limit };
      const response = await apiService.get(`/wallets`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetWallets());
      dispatch(slice.actions.getWalletsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const deleteWallet =
  ( _id, user, page, limit) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const params = { user, page, limit };
      await apiService.delete(`/wallets/${_id}`);
      toast.success("Delete Transaction successful");

      const response = await apiService.get(`/wallets`, {
        params,
      })
      dispatch(slice.actions.resetWallets());
      dispatch(slice.actions.deleteWalletSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const changeWallet =
  ( {wallet, category, date, amount, description, _id}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/wallets/${_id}`, {
        "wallet": wallet,
        "category": category,
        "date": date,
        "amount": amount,
        "description": description
      });
      console.log("change transaction,", response);
      dispatch(slice.actions.updateWalletSuccess(response.data));
      toast.success("Update transaction successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };