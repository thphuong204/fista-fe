import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transaction/transactionSlice";

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;