import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { router } from "expo-router";

interface BanksError {
  message: string;
}

interface BanksState {
  loading: boolean;
  allBanks: object;
}

const axios = AxiosJSON();

export const getAllBanks = createAsyncThunk(
  "auth/getBanksAsync",
  async ({ token }: { token: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("banks");

      dispatch(banksSuccess(data.banks));
    } catch (error) {
      console.log("banks Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<BanksError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error
          // @ts-ignore
          router.push("/(auth)/(login)/(auth)"); // Redirect to login
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(banksComplete());

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: BanksState = {
  loading: false,
  allBanks: [],
};

const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    banksRequest: (state) => {
      state.loading = true;
    },

    banksSuccess: (state, action) => {
      state.loading = false;
      state.allBanks = action.payload;
    },

    banksComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { banksComplete, banksRequest, banksSuccess } = banksSlice.actions;

export default banksSlice;
