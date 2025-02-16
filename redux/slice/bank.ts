import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface BanksError {
  message: string;
}

interface BanksState {
  loading: boolean;
  linkToken: string | undefined;
  bankData: {
    banks: object;
    balance: string;
  };
  accountData: object;
  transactionData: object;
}

const axios = AxiosJSON();

export const getBankLinkToken = createAsyncThunk(
  "auth/getBankLinkAsync",
  async (_credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("/plaid/get-link-token");

      dispatch(banksLinkTokenData(data?.data?.link_token));
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

export const exchangeLinkToken = createAsyncThunk(
  "auth/exchangeLinkToken",
  async (
    {
      publicToken,
      numberOfAccounts,
      bankName,
    }: {
      publicToken: string;
      numberOfAccounts: number;
      bankName: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(banksRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.post("/plaid/exchange-public-token", {
        publicToken,
        numberOfAccounts,
        bankName,
      });

      if (token) {
        dispatch(getBanks({ token }));
        dispatch(getAccounts({ token }));
      }

      dispatch(banksComplete());

      Toast.show({
        type: "success",
        text1: data?.message,
        visibilityTime: 5000,
      });
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

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getBanks = createAsyncThunk(
  "auth/getBanksAsync",
  async ({ token }: { token: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("plaid/get-user-banks");

      dispatch(banksSuccess(data?.data));
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

export const getAccounts = createAsyncThunk(
  "auth/getBanksAsync",
  async ({ token }: { token: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("plaid/get-user-accounts");

      dispatch(banksAccountSuccess(data?.data));
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

export const getTransactions = createAsyncThunk(
  "auth/getBanksAsync",
  async ({ token }: { token: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("plaid/get-user-transactions");

      dispatch(banksAccountTransactionsSuccess(data?.data));
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
  bankData: {
    banks: [],
    balance: "",
  },
  linkToken: undefined,
  accountData: [],
  transactionData: [],
};

const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    banksRequest: (state) => {
      state.loading = true;
    },

    banksLinkTokenData: (state, action) => {
      state.loading = false;
      state.linkToken = action.payload;
    },

    banksSuccess: (state, action) => {
      state.loading = false;
      state.bankData = action.payload;
    },

    banksAccountSuccess: (state, action) => {
      state.loading = false;
      state.accountData = action.payload;
    },

    banksAccountTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactionData = action.payload;
    },

    banksComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  banksComplete,
  banksRequest,
  banksSuccess,
  banksLinkTokenData,
  banksAccountSuccess,
  banksAccountTransactionsSuccess,
} = banksSlice.actions;

export default banksSlice;
