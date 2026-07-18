import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  dataUserNPeriod: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoadingPatch: boolean;
  message: string;
  messagePatch: string;
}

const initialState: variabel = {
  data: null,
  dataUserNPeriod: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingPatch: false,
  message: "",
  messagePatch: "",
};

export const GetCommissionerVoteDatas: any = createAsyncThunk(
  "CommissionerVote/GetCommissionerVoteDatas",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/datas?${datas.searchParams}`,
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

export const GetCommissionerVoteTable: any = createAsyncThunk(
  "CommissionerVote/GetCommissionerVoteTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/table?${datas}`,
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

export const GetCommissionerVoteById: any = createAsyncThunk(
  "CommissionerVote/GetCommissionerVoteById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/data/${uuid}`,
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

export const GetCommissionerVoteByUserNPeriod: any = createAsyncThunk(
  "CommissionerVote/GetCommissionerVoteByUserNPeriod",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/data_user_period/${datas.user_uuid}/${datas.voting_period_uuid}`,
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

export const UpdateCommissionerVoteData: any = createAsyncThunk(
  "CommissionerVote/UpdateCommissionerVoteData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/data/${datas.uuid}`,
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

export const CreateCommissionerVoteData: any = createAsyncThunk(
  "CommissionerVote/CreateCommissionerVoteData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/data`,
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

export const DeleteCommissionerVoteData: any = createAsyncThunk(
  "CommissionerVote/DeleteCommissionerVoteData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/commissioner_vote/data/${datas.uuid}`,
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

export const CommissionerVoteSlice = createSlice({
  name: "CommissionerVote",
  initialState,
  reducers: {
    resetCommissionerVote: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetCommissionerVoteDatas
    builder.addCase(GetCommissionerVoteDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCommissionerVoteDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetCommissionerVoteDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCommissionerVoteTable
    builder.addCase(GetCommissionerVoteTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCommissionerVoteTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetCommissionerVoteTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCommissionerVoteById
    builder.addCase(GetCommissionerVoteById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCommissionerVoteById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetCommissionerVoteById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetCommissionerVoteByUserNPeriod
    builder.addCase(GetCommissionerVoteByUserNPeriod.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(
      GetCommissionerVoteByUserNPeriod.fulfilled,
      (state, action) => {
        state.isLoadingPatch = false;
        state.isSuccess = true;
        state.dataUserNPeriod = action.payload;
      },
    );
    builder.addCase(
      GetCommissionerVoteByUserNPeriod.rejected,
      (state, action) => {
        state.isLoadingPatch = false;
        state.isError = true;
        state.message = action.payload;
      },
    );

    //UpdateCommissionerVoteData
    builder.addCase(UpdateCommissionerVoteData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(UpdateCommissionerVoteData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(UpdateCommissionerVoteData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //CreateDataCommissionerVote
    builder.addCase(CreateCommissionerVoteData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(CreateCommissionerVoteData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(CreateCommissionerVoteData.rejected, (state, action) => {
      state.isLoadingPatch = true;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //DeleteDataCommissionerVote
    builder.addCase(DeleteCommissionerVoteData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteCommissionerVoteData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(DeleteCommissionerVoteData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetCommissionerVote } = CommissionerVoteSlice.actions;
export default CommissionerVoteSlice.reducer;
