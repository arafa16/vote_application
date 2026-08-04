import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoadingPatch: boolean;
  isLoadingSend: boolean;
  message: string;
  messagePatch: string;
  messageSend: string;
}

const initialState: variabel = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingPatch: false,
  isLoadingSend: false,
  message: "",
  messagePatch: "",
  messageSend: "",
};

export const SendEmailInvitationUser: any = createAsyncThunk(
  "Email/SendEmailInvitationUser",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/invitation/${uuid}`,
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

export const SendEmailInvitationUserAll: any = createAsyncThunk(
  "Email/SendEmailInvitationUserAll",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/invitation_all?${datas.searchParams}`,
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

export const GetEmailDataTable: any = createAsyncThunk(
  "Email/GetEmailDataTable",
  async (props: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/table?${props.searchParams}`,
        {
          withCredentials: true, // Now this is was the missing piece in the client side
        },
      );

      console.log(props.searchParams);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  },
);

export const GetEmailDataById: any = createAsyncThunk(
  "Email/GetEmailDataById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/mail/data/${uuid}`,
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

export const UpdateStatusEmailData: any = createAsyncThunk(
  "Email/UpdateStatusEmailData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/data/${datas.uuid}`,
        datas.formData,
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

export const DeleteEmailDataData: any = createAsyncThunk(
  "Email/DeleteEmailDataData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/data/${datas.uuid}?permanent=1`,
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

export const SendEmailById: any = createAsyncThunk(
  "Email/SendEmailById",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/mail/send/${datas.uuid}`,
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
    //SendEmailAll
    builder.addCase(SendEmailInvitationUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SendEmailInvitationUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(SendEmailInvitationUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //SendEmailAll
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

    //GetEmailDataTable
    builder.addCase(GetEmailDataTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetEmailDataTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetEmailDataTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetEmailDataById
    builder.addCase(GetEmailDataById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetEmailDataById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetEmailDataById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //UpdateStatusEmailData
    builder.addCase(UpdateStatusEmailData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(UpdateStatusEmailData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(UpdateStatusEmailData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //DeleteEmailDataData
    builder.addCase(DeleteEmailDataData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(DeleteEmailDataData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(DeleteEmailDataData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //DeleteEmailDataData
    builder.addCase(SendEmailById.pending, (state) => {
      state.isLoadingSend = true;
    });
    builder.addCase(SendEmailById.fulfilled, (state, action) => {
      state.isLoadingSend = false;
      state.isSuccess = true;
      state.messageSend = action.payload;
    });
    builder.addCase(SendEmailById.rejected, (state, action) => {
      state.isLoadingSend = false;
      state.isError = true;
      state.messageSend = action.payload;
    });
  },
});

export const { resetEmail } = EmailSlice.actions;
export default EmailSlice.reducer;
