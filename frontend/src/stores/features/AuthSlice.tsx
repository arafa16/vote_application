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

export const Login: any = createAsyncThunk(
  "Auth/Login",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/auth/login`,
        datas,
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

export const RegistrationAttributes: any = createAsyncThunk(
  "Auth/RegistrationAttributes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/auth/register`,
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

export const Registration: any = createAsyncThunk(
  "Auth/Registration",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/auth/register`,
        datas,
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

export const Logout: any = createAsyncThunk(
  "Auth/Logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL + "/api/v1/auth/logout",
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

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    resetAuth: (state) => initialState,
  },
  extraReducers: (builder) => {
    //Login
    builder.addCase(Login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Login
    builder.addCase(Logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(Logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Registration attributes
    builder.addCase(RegistrationAttributes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RegistrationAttributes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(RegistrationAttributes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Registration
    builder.addCase(Registration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Registration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(Registration.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
