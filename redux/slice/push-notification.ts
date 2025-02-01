import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";

interface PushNotificationError {
  message: string;
}

interface PushNotificationState {
  loading: boolean;
}

const axios = AxiosJSON();

export const saveExpoPushToken = createAsyncThunk(
  "auth/pushNotificationAsync",
  async (
    { pushToken }: { pushToken: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(pushNotificationRequest());

      await axios.post("/save-push-token", {
        pushToken,
      });

      dispatch(pushNotificationComplete());
    } catch (error) {
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<PushNotificationError>;

      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          return;
        } else if (axiosError.response.data) {
          console.log("pushNotification Error", error);
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
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
