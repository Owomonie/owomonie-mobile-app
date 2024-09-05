import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface GetUserDetailsError {
  message: string;
}

interface GetUserDetailsState {
  loading: boolean;
  userDetails: object;
}

const axios = AxiosJSON();

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetailsAsync",
  async (
    { token, login }: { token: string; login?: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(getUserDetailsRequest());

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("get-user-details");

      dispatch(getUserDetailsSuccess(data.user));

      if (!data?.gender) {
        // @ts-ignore
        router.push("/(predetails)/gender");
      } else {
        // @ts-ignore
        router.push("/(home)/home");
      }
    } catch (error) {
      console.log("getUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<GetUserDetailsError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(getUserDetailsComplete());

      // @ts-ignore
      router.push("/(auth)/login/(auth)");

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: GetUserDetailsState = {
  loading: false,
  userDetails: [],
};

const getUserDetailsSlice = createSlice({
  name: "getUserDetails",
  initialState,
  reducers: {
    getUserDetailsRequest: (state) => {
      state.loading = true;
    },

    getUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
    },

    getUserDetailsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getUserDetailsComplete,
  getUserDetailsRequest,
  getUserDetailsSuccess,
} = getUserDetailsSlice.actions;

export default getUserDetailsSlice;
