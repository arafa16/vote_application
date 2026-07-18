import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: variabel = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const GetMe: any = createAsyncThunk(
  "Auth/GetMe",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/auth/me`,
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

export const GetMeSlice = createSlice({
  name: "GetMe",
  initialState,
  reducers: {
    resetGetMe: (state) => initialState,
  },
  extraReducers: (builder) => {
    //CreateTicket
    builder.addCase(GetMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetGetMe } = GetMeSlice.actions;
export default GetMeSlice.reducer;
