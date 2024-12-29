import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface CreateAccountError {
  message: string;
}

interface CreateAccountState {
  loading: boolean;
}

const axios = AxiosJSON();

export const newUserVerify = createAsyncThunk(
  "auth/createAccountAsync",
  async (
    { email, resend }: { email: string; resend?: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(createAccountRequest());

      const { data } = await axios.post("new-user-verification", {
        email,
      });

      dispatch(createAccountComplete());

      if (!resend) {
        router.push(`/(auth)/(register)/(new-email-verification)/${email}`);
      }

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("New User Verify", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<CreateAccountError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(createAccountComplete());

      Toast.show({
        type: "error",
        text1: errorMessage ? errorMessage : "Network Error",
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const newUserVerifyOTP = createAsyncThunk(
  "auth/createAccountAsync",
  async (
    {
      email,
      OTP,
      pushToken,
    }: { email: string; OTP: string; pushToken: string | null },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(createAccountRequest());

      const { data } = await axios.post("new-user-verification/verify-otp", {
        email,
        OTP,
        pushToken,
      });

      dispatch(createAccountComplete());

      router.push(`/(auth)/(register)/(create-account)/${email}`);

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("New User Verify OTP", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<CreateAccountError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(createAccountComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const registerNewUser = createAsyncThunk(
  "auth/createAccountAsync",
  async (
    {
      email,
      userName,
      firstName,
      lastName,
      password,
    }: {
      email: string;
      userName: string;
      firstName: string;
      lastName: string;
      password: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(createAccountRequest());

      const { data } = await axios.patch("register-user", {
        email,
        userName,
        lastName,
        password,
        firstName,
      });

      dispatch(createAccountComplete());

      router.push(`/(auth)/(register)/(success)/${email}`);

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("Register New User", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<CreateAccountError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(createAccountComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: CreateAccountState = {
  loading: false,
};

const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {
    createAccountRequest: (state) => {
      state.loading = true;
    },

    createAccountComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { createAccountComplete, createAccountRequest } =
  createAccountSlice.actions;

export default createAccountSlice;
