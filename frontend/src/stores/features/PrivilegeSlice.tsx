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

export const GetPrivilegeDatas: any = createAsyncThunk(
  "Privilege/GetPrivilegeDatas",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/privilege/datas?${datas.searchParams}`,
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

export const GetPrivilegeTable: any = createAsyncThunk(
  "Privilege/GetPrivilegeTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/privilege/table?${datas}`,
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

export const GetPrivilegeById: any = createAsyncThunk(
  "Privilege/GetPrivilegeById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/privilege/data/${uuid}`,
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

export const UpdatePrivilegeData: any = createAsyncThunk(
  "Privilege/UpdatePrivilegeData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/privilege/data/${datas.uuid}`,
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

export const CreatePrivilegeData: any = createAsyncThunk(
  "Privilege/CreatePrivilegeData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/privilege/data`,
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

export const DeletePrivilegeData: any = createAsyncThunk(
  "Privilege/DeletePrivilegeData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/privilege/data/${datas.uuid}`,
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

export const PrivilegeSlice = createSlice({
  name: "Privilege",
  initialState,
  reducers: {
    resetPrivilege: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetPrivilegeDatas
    builder.addCase(GetPrivilegeDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetPrivilegeDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetPrivilegeDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetPrivilegeTable
    builder.addCase(GetPrivilegeTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetPrivilegeTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetPrivilegeTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetPrivilegeById
    builder.addCase(GetPrivilegeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetPrivilegeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetPrivilegeById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //UpdatePrivilegeData
    builder.addCase(UpdatePrivilegeData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(UpdatePrivilegeData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(UpdatePrivilegeData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //CreateDataPrivilege
    builder.addCase(CreatePrivilegeData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(CreatePrivilegeData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(CreatePrivilegeData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.message = action.payload;
    });

    //DeleteDataPrivilege
    builder.addCase(DeletePrivilegeData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeletePrivilegeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(DeletePrivilegeData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetPrivilege } = PrivilegeSlice.actions;
export default PrivilegeSlice.reducer;
