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
      let errorMessage = "An error occurred";

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
