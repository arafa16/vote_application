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

export const GetAuditLogDatas: any = createAsyncThunk(
  "AuditLog/GetAuditLogDatas",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/datas?${datas.searchParams}`,
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

export const GetAuditLogTable: any = createAsyncThunk(
  "AuditLog/GetAuditLogTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/table?${datas}`,
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

export const GetAuditLogById: any = createAsyncThunk(
  "AuditLog/GetAuditLogById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/data/${uuid}`,
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

export const GetCreateAuditLogAttributes: any = createAsyncThunk(
  "AuditLog/GetCreateAuditLogAttributes",
  async (_: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/create_attributes`,
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

export const GetUpdateAuditLogAttributes: any = createAsyncThunk(
  "AuditLog/GetUpdateAuditLogAttributes",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/update_attributes/${uuid}`,
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

export const UpdateAuditLogData: any = createAsyncThunk(
  "AuditLog/UpdateAuditLogData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/data/${datas.uuid}`,
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

export const CreateAuditLogData: any = createAsyncThunk(
  "AuditLog/CreateAuditLogData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/audit_log/data`,
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

export const DeleteAuditLogData: any = createAsyncThunk(
  "AuditLog/DeleteAuditLogData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/audit_log/data/${datas.uuid}?permanent=1`,
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

export const AuditLogSlice = createSlice({
  name: "AuditLog",
  initialState,
  reducers: {
    resetAuditLog: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetAuditLogDatas
    builder.addCase(GetAuditLogDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAuditLogDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetAuditLogDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetAuditLogTable
    builder.addCase(GetAuditLogTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAuditLogTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetAuditLogTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetAuditLogById
    builder.addCase(GetAuditLogById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAuditLogById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetAuditLogById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCreateAuditLogAttributes
    builder.addCase(GetCreateAuditLogAttributes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCreateAuditLogAttributes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetCreateAuditLogAttributes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCreateAuditLogAttributes
    builder.addCase(GetUpdateAuditLogAttributes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetUpdateAuditLogAttributes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetUpdateAuditLogAttributes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //UpdateAuditLogData
    builder.addCase(UpdateAuditLogData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(UpdateAuditLogData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(UpdateAuditLogData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //CreateDataAuditLog
    builder.addCase(CreateAuditLogData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(CreateAuditLogData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(CreateAuditLogData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //DeleteDataAuditLog
    builder.addCase(DeleteAuditLogData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteAuditLogData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(DeleteAuditLogData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetAuditLog } = AuditLogSlice.actions;
export default AuditLogSlice.reducer;
