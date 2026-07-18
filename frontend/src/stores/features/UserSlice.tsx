import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  dataAttribute: any;
  isError: boolean;
  isErrorPatch: boolean;
  isSuccess: boolean;
  isSuccessPatch: boolean;
  isLoading: boolean;
  isLoadingUpdate: boolean;
  message: string;
  messageUpdate: string;
  messageCreate: string;
  messageDelete: string;
  messagePassword: string;
  messagePasswordPatch: string;
}

const initialState: variabel = {
  data: null,
  dataAttribute: null,
  isError: false,
  isErrorPatch: false,
  isSuccess: false,
  isSuccessPatch: false,
  isLoading: false,
  isLoadingUpdate: false,
  message: "",
  messageUpdate: "",
  messageCreate: "",
  messageDelete: "",
  messagePassword: "",
  messagePasswordPatch: "",
};

export const GetUserDatas: any = createAsyncThunk(
  "User/GetUserDatas",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/user/datas`,
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

export const GetUserTable: any = createAsyncThunk(
  "User/GetUserTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/user/table?${datas}`,
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

export const GetUserById: any = createAsyncThunk(
  "User/GetUserById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/user/data/${uuid}`,
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

export const GetUpdateAttributeById: any = createAsyncThunk(
  "User/GetUpdateAttributeById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/user/update_attributes/${uuid}`,
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

export const UpdateUserData: any = createAsyncThunk(
  "User/UpdateUserData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/user/data/${datas.uuid}`,
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

export const GetCreateAttribute: any = createAsyncThunk(
  "User/GetCreateAttribute",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/user/create_attributes`,
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

export const CreateUserData: any = createAsyncThunk(
  "User/CreateUserData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/user/data`,
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

export const DeleteUserData: any = createAsyncThunk(
  "User/DeleteUserData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/user/data/${datas.uuid}`,
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

export const ChangePassword: any = createAsyncThunk(
  "User/ChangePassword",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/user/change_password`,
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

export const ChangePasswordById: any = createAsyncThunk(
  "User/ChangePasswordById",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/user/change_password/${datas.uuid}`,
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

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetUserDatas
    builder.addCase(GetUserDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetUserDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetUserTable
    builder.addCase(GetUserTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetUserTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetUserById
    builder.addCase(GetUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetUpdateAttributeById
    builder.addCase(GetUpdateAttributeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUpdateAttributeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetUpdateAttributeById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //UpdateUserData
    builder.addCase(UpdateUserData.pending, (state) => {
      state.isLoadingUpdate = true;
    });
    builder.addCase(UpdateUserData.fulfilled, (state, action) => {
      state.isLoadingUpdate = false;
      state.isSuccess = true;
      state.messageUpdate = action.payload;
    });
    builder.addCase(UpdateUserData.rejected, (state, action) => {
      state.isLoadingUpdate = false;
      state.isError = true;
      state.messageUpdate = action.payload;
    });

    //GetCreateAttribute
    builder.addCase(GetCreateAttribute.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCreateAttribute.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataAttribute = action.payload;
    });
    builder.addCase(GetCreateAttribute.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //CreateDataUser
    builder.addCase(CreateUserData.pending, (state) => {
      state.isLoadingUpdate = true;
    });
    builder.addCase(CreateUserData.fulfilled, (state, action) => {
      state.isLoadingUpdate = false;
      state.isSuccess = true;
      state.messageCreate = action.payload;
    });
    builder.addCase(CreateUserData.rejected, (state, action) => {
      state.isLoadingUpdate = false;
      state.isError = true;
      state.messageCreate = action.payload;
    });

    //DeleteDataUser
    builder.addCase(DeleteUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.messageDelete = action.payload;
    });
    builder.addCase(DeleteUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.messageDelete = action.payload;
    });

    //ChangePassword
    builder.addCase(ChangePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ChangePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.messagePassword = action.payload;
    });
    builder.addCase(ChangePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.messagePassword = action.payload;
    });

    //ChangePassword
    builder.addCase(ChangePasswordById.pending, (state) => {
      state.isLoadingUpdate = true;
    });
    builder.addCase(ChangePasswordById.fulfilled, (state, action) => {
      state.isLoadingUpdate = false;
      state.isSuccessPatch = true;
      state.messagePasswordPatch = action.payload;
    });
    builder.addCase(ChangePasswordById.rejected, (state, action) => {
      state.isLoadingUpdate = false;
      state.isErrorPatch = true;
      state.messagePasswordPatch = action.payload;
    });
  },
});

export const { resetUser } = UserSlice.actions;
export default UserSlice.reducer;
