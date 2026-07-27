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

export const SendEmailInvitationUserAll: any = createAsyncThunk(
  "Email/SendEmailInvitationUserAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/mail/invitation_all`,
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

export const EmailSlice = createSlice({
  name: "Email",
  initialState,
  reducers: {
    resetEmail: (state) => initialState,
  },
  extraReducers: (builder) => {
    //SendEmail
    builder.addCase(SendEmailInvitationUserAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SendEmailInvitationUserAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(SendEmailInvitationUserAll.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetEmail } = EmailSlice.actions;
export default EmailSlice.reducer;
