import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PushNotificationError {
  message: string;
}

interface PushNotificationState {
  loading: boolean;
}

const axios = AxiosJSON();

export const saveUserExpoPushToken = createAsyncThunk(
  "auth/pushNotificationAsync",
  async (
    { pushToken }: { pushToken: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(pushNotificationRequest());

      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch("/notifications/save-push-token", {
        pushToken,
      });
      console.log(data?.message);

      dispatch(pushNotificationComplete());
    } catch (error) {
      console.log("pushNotification Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<PushNotificationError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(pushNotificationComplete());

      return rejectWithValue({ message: errorMessage });
    }
  }
);
export const saveUnauthenticatedUserExpoPushToken = createAsyncThunk(
  "auth/pushNotificationAsync",
  async (
    { pushToken }: { pushToken: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(pushNotificationRequest());

      const { data } = await axios.post(
        "/unauth-notifications/save-push-token",
        {
          pushToken,
        }
      );
      console.log(data?.message);

      dispatch(pushNotificationComplete());
    } catch (error) {
      console.log("pushNotification Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<PushNotificationError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(pushNotificationComplete());

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: PushNotificationState = {
  loading: false,
};

const pushNotificationSlice = createSlice({
  name: "pushNotification",
  initialState,
  reducers: {
    pushNotificationRequest: (state) => {
      state.loading = true;
    },

    pushNotificationComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { pushNotificationComplete, pushNotificationRequest } =
  pushNotificationSlice.actions;

export default pushNotificationSlice;
