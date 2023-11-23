import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import walletReducer from "../features/wallet/walletSlice";
import categoryReducer from "../features/category/categorySlice";
import transactionReducer from "../features/transaction/transactionSlice";

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
  wallet: walletReducer,
  category: categoryReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;