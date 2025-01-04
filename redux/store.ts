import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
import createAccountSlice from "./slice/create-account";
import forgetPasswordSlice from "./slice/forgot-passord";
import loginSlice from "./slice/login";
import getUserDetailsSlice from "./slice/get-user-details";
import updateUserDetailsSlice from "./slice/update-user-details";
import pushNotificationSlice from "./slice/push-notification";
import logOutSlice from "./slice/logout";

const rootReducer = combineReducers({
  createAccount: createAccountSlice.reducer,
  forgetPassword: forgetPasswordSlice.reducer,
  login: loginSlice.reducer,
  logout: logOutSlice.reducer,
  userDetails: getUserDetailsSlice.reducer,
  updateUser: updateUserDetailsSlice.reducer,
  pushNotifications: pushNotificationSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
