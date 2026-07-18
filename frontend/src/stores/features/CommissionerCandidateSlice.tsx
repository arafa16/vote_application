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

export const GetCommissionerCandidateDatas: any = createAsyncThunk(
  "CommissionerCandidate/GetCommissionerCandidateDatas",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/datas?${datas.searchParams}`,
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

export const GetCommissionerCandidateTable: any = createAsyncThunk(
  "CommissionerCandidate/GetCommissionerCandidateTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/table?${datas}`,
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

export const GetCommissionerCandidateById: any = createAsyncThunk(
  "CommissionerCandidate/GetCommissionerCandidateById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/data/${uuid}`,
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
  "CommissionerCandidate/GetUpdateAttributeById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/update_attributes/${uuid}`,
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

export const UpdateCommissionerCandidateData: any = createAsyncThunk(
  "CommissionerCandidate/UpdateCommissionerCandidateData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/data/${datas.uuid}`,
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
  "CommissionerCandidate/GetCreateAttribute",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/create_attributes`,
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

export const CreateCommissionerCandidateData: any = createAsyncThunk(
  "CommissionerCandidate/CreateCommissionerCandidateData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/data`,
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

export const DeleteCommissionerCandidateData: any = createAsyncThunk(
  "CommissionerCandidate/DeleteCommissionerCandidateData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_candidate/data/${datas.uuid}`,
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

export const CommissionerCandidateSlice = createSlice({
  name: "CommissionerCandidate",
  initialState,
  reducers: {
    resetCommissionerCandidate: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetCommissionerCandidateDatas
    builder.addCase(GetCommissionerCandidateDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      GetCommissionerCandidateDatas.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      },
    );
    builder.addCase(GetCommissionerCandidateDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCommissionerCandidateTable
    builder.addCase(GetCommissionerCandidateTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      GetCommissionerCandidateTable.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      },
    );
    builder.addCase(GetCommissionerCandidateTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCommissionerCandidateById
    builder.addCase(GetCommissionerCandidateById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCommissionerCandidateById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetCommissionerCandidateById.rejected, (state, action) => {
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

    //UpdateCommissionerCandidateData
    builder.addCase(UpdateCommissionerCandidateData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      UpdateCommissionerCandidateData.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      },
    );
    builder.addCase(
      UpdateCommissionerCandidateData.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },
    );

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

    //CreateDataCommissionerCandidate
    builder.addCase(CreateCommissionerCandidateData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      CreateCommissionerCandidateData.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      },
    );
    builder.addCase(
      CreateCommissionerCandidateData.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },
    );

    //DeleteDataCommissionerCandidate
    builder.addCase(DeleteCommissionerCandidateData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      DeleteCommissionerCandidateData.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      },
    );
    builder.addCase(
      DeleteCommissionerCandidateData.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },
    );
  },
});

export const { resetCommissionerCandidate } =
  CommissionerCandidateSlice.actions;
export default CommissionerCandidateSlice.reducer;
