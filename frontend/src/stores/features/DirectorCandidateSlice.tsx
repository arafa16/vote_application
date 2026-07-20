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

export const GetDirectorCandidateDatas: any = createAsyncThunk(
  "DirectorCandidate/GetDirectorCandidateDatas",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/datas?${datas.searchParams}`,
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

export const GetDirectorCandidateTable: any = createAsyncThunk(
  "DirectorCandidate/GetDirectorCandidateTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/table?${datas}`,
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

export const GetDirectorCandidateById: any = createAsyncThunk(
  "DirectorCandidate/GetDirectorCandidateById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/data/${uuid}`,
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
  "DirectorCandidate/GetUpdateAttributeById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/update_attributes/${uuid}`,
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

export const UpdateDirectorCandidateData: any = createAsyncThunk(
  "DirectorCandidate/UpdateDirectorCandidateData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/data/${datas.uuid}`,
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
  "DirectorCandidate/GetCreateAttribute",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/create_attributes`,
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

export const CreateDirectorCandidateData: any = createAsyncThunk(
  "DirectorCandidate/CreateDirectorCandidateData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/data`,
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

export const DeleteDirectorCandidateData: any = createAsyncThunk(
  "DirectorCandidate/DeleteDirectorCandidateData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_candidate/data/${datas.uuid}`,
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

export const DirectorCandidateSlice = createSlice({
  name: "DirectorCandidate",
  initialState,
  reducers: {
    resetDirectorCandidate: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetDirectorCandidateDatas
    builder.addCase(GetDirectorCandidateDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorCandidateDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetDirectorCandidateDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetDirectorCandidateTable
    builder.addCase(GetDirectorCandidateTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorCandidateTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetDirectorCandidateTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetDirectorCandidateById
    builder.addCase(GetDirectorCandidateById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorCandidateById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetDirectorCandidateById.rejected, (state, action) => {
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

    //UpdateDirectorCandidateData
    builder.addCase(UpdateDirectorCandidateData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(UpdateDirectorCandidateData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(UpdateDirectorCandidateData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //GetCreateAttribute
    builder.addCase(GetCreateAttribute.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCreateAttribute.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetCreateAttribute.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //CreateDataDirectorCandidate
    builder.addCase(CreateDirectorCandidateData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(CreateDirectorCandidateData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(CreateDirectorCandidateData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //DeleteDataDirectorCandidate
    builder.addCase(DeleteDirectorCandidateData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteDirectorCandidateData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(DeleteDirectorCandidateData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetDirectorCandidate } = DirectorCandidateSlice.actions;
export default DirectorCandidateSlice.reducer;
