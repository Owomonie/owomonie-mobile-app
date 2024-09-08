import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosFormData, AxiosJSON } from "../axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FileDoc } from "@/utils/types";

interface UpdateUserDetailsError {
  message: string;
}

interface UpdateUserDetailsState {
  loading: boolean;
}

const axios = AxiosJSON();
const axios2 = AxiosFormData();

export const updateUserGender = createAsyncThunk(
  "auth/updateUserDetailsAsync",
  async ({ gender }: { gender: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateUserDetailsRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch("update/gender", {
        gender,
      });

      dispatch(updateUserDetailsComplete());

      router.push("/(predetails)/age");

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("updateUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<UpdateUserDetailsError>;
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

      dispatch(updateUserDetailsComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateUserAgeRange = createAsyncThunk(
  "auth/updateUserDetailsAsync",
  async ({ ageRange }: { ageRange: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateUserDetailsRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch("update/age-range", {
        ageRange,
      });

      dispatch(updateUserDetailsComplete());

      router.push("/(predetails)/work");

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("updateUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<UpdateUserDetailsError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error
          //@ts-ignore
          router.push("/(auth)/(login)/(auth)"); // Redirect to login
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(updateUserDetailsComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateUserWorkType = createAsyncThunk(
  "auth/updateUserDetailsAsync",
  async ({ workType }: { workType: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateUserDetailsRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch("update/work-type", {
        workType,
      });

      dispatch(updateUserDetailsComplete());

      router.push("/(predetails)/income");

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("updateUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<UpdateUserDetailsError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error
          //@ts-ignore
          router.push("/(auth)/(login)/(auth)"); // Redirect to login
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(updateUserDetailsComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateUserIncomeRange = createAsyncThunk(
  "auth/updateUserDetailsAsync",
  async (
    { incomeRange }: { incomeRange: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateUserDetailsRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch("update/income-range", {
        incomeRange,
      });

      dispatch(updateUserDetailsComplete());

      router.push("/(predetails)/avatar");

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("updateUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<UpdateUserDetailsError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error
          //@ts-ignore
          router.push("/(auth)/(login)/(auth)"); // Redirect to login
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(updateUserDetailsComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserDetailsAsync",
  async (
    {
      image,
      avatarNum,
    }: {
      image?: FileDoc;
      avatarNum: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateUserDetailsRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const formData = new FormData();

      if (image) {
        // @ts-expect-error
        formData.append("avatar", {
          uri: image.uri,
          type: image.mimeType,
          name: image.fileName,
        });

        const { data } = await axios2.patch("update/avatar", formData);

        console.log(data, "User");

        dispatch(updateUserDetailsComplete());

        Toast.show({
          type: "success",
          text1: data.message,
          visibilityTime: 5000,
        });
      }

      if (avatarNum) {
        const { data } = await axios.patch("update/avatar", {
          avatarNum,
        });

        dispatch(updateUserDetailsComplete());

        router.push("/(home)/home");

        Toast.show({
          type: "success",
          text1: data.message,
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.log("updateUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<UpdateUserDetailsError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error
          //@ts-ignore
          router.push("/(auth)/(login)/(auth)"); // Redirect to login
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(updateUserDetailsComplete());

      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: UpdateUserDetailsState = {
  loading: false,
};

const updateUserDetailsSlice = createSlice({
  name: "updateUserDetails",
  initialState,
  reducers: {
    updateUserDetailsRequest: (state) => {
      state.loading = true;
    },

    updateUserDetailsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { updateUserDetailsComplete, updateUserDetailsRequest } =
  updateUserDetailsSlice.actions;

export default updateUserDetailsSlice;
