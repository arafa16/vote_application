import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoadingPatch: boolean;
  message: string;
  messagePatch: string;
}

const initialState: variabel = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingPatch: false,
  message: "",
  messagePatch: "",
};

export const GetActivationByToken: any = createAsyncThunk(
  "Activation/GetActivationByToken",
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/activation/${token}`,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        },
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  },
);

export const ActivationSlice = createSlice({
  name: "Activation",
  initialState,
  reducers: {
    resetActivation: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetActivationById
    builder.addCase(GetActivationByToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetActivationByToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(GetActivationByToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetActivation } = ActivationSlice.actions;
export default ActivationSlice.reducer;
