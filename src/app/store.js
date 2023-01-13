import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import walletReducer from "../features/wallet/walletSlice";
import transactionReducer from "../features/transaction/transactionSlice";

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  wallet: walletReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;