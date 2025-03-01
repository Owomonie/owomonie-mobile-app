import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Transaction } from "@/utils/types";

interface BanksError {
  message: string;
}

interface BanksState {
  loading: boolean;
  transactionLoading: boolean;
  linkToken: string | undefined;
  bankData: {
    banks: object;
    balance: string;
  };
  accountData: object;
  transactionData: {
    transactions: Transaction[];
    totalPages: string;
  };
}

const axios = AxiosJSON();

const handleAxiosError = (error: unknown) => {
  let errorMessage = "Network Error";
  const axiosError = error as AxiosError<BanksError>;
  if (axiosError.response) {
    if (axiosError.response.status === 403) {
      router.push("/(auth)/(login)/(auth)"); // Redirect to login
      errorMessage = "Access denied. Please log in again.";
    } else if (axiosError.response.data) {
      errorMessage = axiosError.response.data.message;
    }
  }
  return errorMessage;
};

export const getBankLinkToken = createAsyncThunk(
  "auth/getBankLinkAsync",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());
      const token = await AsyncStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.get("/plaid/get-link-token");
      dispatch(banksLinkTokenData(data?.data?.link_token));
    } catch (error) {
      console.log("banks Error", error);
      const errorMessage = handleAxiosError(error);
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
    }: { publicToken: string; numberOfAccounts: number; bankName: string },
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
        dispatch(getTransactions({ token }));
      }

      dispatch(banksComplete());
      Toast.show({
        type: "success",
        text1: data?.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("banks Error", error);
      const errorMessage = handleAxiosError(error);
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
      const errorMessage = handleAxiosError(error);
      dispatch(banksComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getAccounts = createAsyncThunk(
  "auth/getAccountsAsync",
  async ({ token }: { token: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(banksRequest());
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.get("plaid/get-user-accounts");
      dispatch(banksAccountSuccess(data?.data));
    } catch (error) {
      console.log("banks Error", error);
      const errorMessage = handleAxiosError(error);
      dispatch(banksComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getTransactions = createAsyncThunk(
  "auth/getTransactionsAsync",
  async (
    {
      token,
      page = 1,
      limit = 20,
    }: { token: string; page?: number; limit?: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(banksTransactionsRequest());
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.get(
        `plaid/get-user-transactions?page=${page}&limit=${limit}`
      );
      dispatch(banksAccountTransactionsSuccess(data?.data));
    } catch (error) {
      console.log("banks Error", error);
      const errorMessage = handleAxiosError(error);
      dispatch(banksComplete());
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: BanksState = {
  loading: false,
  transactionLoading: false,
  bankData: {
    banks: [],
    balance: "",
  },
  linkToken: undefined,
  accountData: [],
  transactionData: {
    transactions: [],
    totalPages: "",
  },
};

const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    banksRequest: (state) => {
      state.loading = true;
    },

    banksTransactionsRequest: (state) => {
      state.transactionLoading = true;
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
      state.transactionLoading = false;

      const existingTransactionIds = new Set(
        state.transactionData.transactions.map((tx) => tx.id)
      );

      const newTransactions = action.payload.transactions.filter(
        (tx: Transaction) => !existingTransactionIds.has(tx.id)
      );

      // Append new unique transactions to the existing ones
      state.transactionData.transactions = [
        ...state.transactionData.transactions,
        ...newTransactions,
      ];

      state.transactionData.totalPages = action.payload.totalPages;
    },

    banksComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  banksComplete,
  banksRequest,
  banksTransactionsRequest,
  banksSuccess,
  banksLinkTokenData,
  banksAccountSuccess,
  banksAccountTransactionsSuccess,
} = banksSlice.actions;

export default banksSlice;
