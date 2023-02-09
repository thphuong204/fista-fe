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
      state.totalPages = Math.ceil(total/WALLETS_PER_PAGE);
    },
    
    createWalletSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newWallet= action.payload;
      if (state.currentPageWallets.length % WALLETS_PER_PAGE === 0)
        state.currentPageWallets.pop();
      state.walletById[newWallet._id] = newWallet;
      state.currentPageWallets.unshift(newWallet._id);
    },

    deleteWalletSuccess(state, action) {
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

    updateWalletSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const changedWallet = action.payload;
      state.walletById[changedWallet._id].name = changedWallet.name;
      state.walletById[changedWallet._id].classification = changedWallet.classification;
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
    toast.success("Create wallet successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getWallets = ( page, limit ) =>
async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { page, limit };
    const response = await apiService.get(`/wallets`, {
      params,
    });
    dispatch(slice.actions.resetWallets());
    dispatch(slice.actions.getWalletsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

  export const deleteWallet = (_id) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/wallets/${_id}`);
      toast.success("Delete wallet successful");

      const response = await apiService.get(`/wallets`)
      dispatch(slice.actions.resetWallets());
      dispatch(slice.actions.deleteWalletSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const changeWallet =
  ( { _id, name, classification }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/wallets/${_id}`, {
        "name": name,
        "classification": classification
      });
      dispatch(slice.actions.updateWalletSuccess(response.data));
      toast.success("Update wallet successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };