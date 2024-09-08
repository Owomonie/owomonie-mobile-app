import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
import createAccountSlice from "./slice/create-account";
import forgetPasswordSlice from "./slice/forgot-passord";
import loginSlice from "./slice/login";
import getUserDetailsSlice from "./slice/get-user-details";
import updateUserDetailsSlice from "./slice/update-user-details";

const rootReducer = combineReducers({
  createAccount: createAccountSlice.reducer,
  forgetPassword: forgetPasswordSlice.reducer,
  login: loginSlice.reducer,
  userDetails: getUserDetailsSlice.reducer,
  updateUser: updateUserDetailsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
