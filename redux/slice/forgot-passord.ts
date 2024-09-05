import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface ForgetPasswordError {
  message: string;
}

interface ForgetPasswordState {
  loading: boolean;
}

const axios = AxiosJSON();

export const forgetUserVerify = createAsyncThunk(
  "auth/forgetPasswordAsync",
  async (
    { email, resend }: { email: string; resend?: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(forgetPasswordRequest());

      const { data } = await axios.post("forget-password/otp", {
        email,
      });

      dispatch(forgetPasswordComplete());

      if (!resend) {
        router.push(`/(auth)/(forget)/(email-verification)/${email}`);
      }

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("Forget User Verify", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<ForgetPasswordError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(forgetPasswordComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const forgetVerifyOTP = createAsyncThunk(
  "auth/forgetPasswordAsync",
  async (
    { email, OTP }: { email: string; OTP: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(forgetPasswordRequest());

      const { data } = await axios.post("forget-password/verify-otp", {
        email,
        OTP,
      });

      dispatch(forgetPasswordComplete());

      router.push(`/(auth)/(forget)/(reset-password)/${email}`);

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("Forget User Verify OTP", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<ForgetPasswordError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(forgetPasswordComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/forgetPasswordAsync",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(forgetPasswordRequest());

      const { data } = await axios.patch("forget-password/reset", {
        email,
        newPassword: password,
      });

      dispatch(forgetPasswordComplete());

      router.push(`/(auth)/(forget)/(success)/${email}`);

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("Reset Password", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<ForgetPasswordError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(forgetPasswordComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: ForgetPasswordState = {
  loading: false,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    forgetPasswordRequest: (state) => {
      state.loading = true;
    },

    forgetPasswordComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { forgetPasswordComplete, forgetPasswordRequest } =
  forgetPasswordSlice.actions;

export default forgetPasswordSlice;
