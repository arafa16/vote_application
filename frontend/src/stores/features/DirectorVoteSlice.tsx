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

export const GetDirectorVoteDatas: any = createAsyncThunk(
  "DirectorVote/GetDirectorVoteDatas",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_vote/datas?${datas.searchParams}`,
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

export const GetDirectorVoteTable: any = createAsyncThunk(
  "DirectorVote/GetDirectorVoteTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_vote/table?${datas}`,
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

export const GetDirectorVoteById: any = createAsyncThunk(
  "DirectorVote/GetDirectorVoteById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_vote/data/${uuid}`,
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

export const GetDirectorVoteByUserNPeriod: any = createAsyncThunk(
  "DirectorVote/GetDirectorVoteByUserNPeriod",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_vote/data_user_period/${datas.user_uuid}/${datas.voting_period_uuid}`,
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

export const UpdateDirectorVoteData: any = createAsyncThunk(
  "DirectorVote/UpdateDirectorVoteData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_vote/data/${datas.uuid}`,
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

export const CreateDirectorVoteData: any = createAsyncThunk(
  "DirectorVote/CreateDirectorVoteData",
  async (datas: any, thunkAPI) => {
    try {
      console.log("datas", datas);
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/director_vote/data`,
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

export const DeleteDirectorVoteData: any = createAsyncThunk(
  "DirectorVote/DeleteDirectorVoteData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/director_vote/data/${datas.uuid}`,
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

export const DirectorVoteSlice = createSlice({
  name: "DirectorVote",
  initialState,
  reducers: {
    resetDirectorVote: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetDirectorVoteDatas
    builder.addCase(GetDirectorVoteDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorVoteDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetDirectorVoteDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetDirectorVoteTable
    builder.addCase(GetDirectorVoteTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorVoteTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetDirectorVoteTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetDirectorVoteById
    builder.addCase(GetDirectorVoteById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorVoteById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetDirectorVoteById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetDirectorVoteByUserNPeriod
    builder.addCase(GetDirectorVoteByUserNPeriod.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetDirectorVoteByUserNPeriod.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataUserNPeriod = action.payload;
    });
    builder.addCase(GetDirectorVoteByUserNPeriod.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //UpdateDirectorVoteData
    builder.addCase(UpdateDirectorVoteData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(UpdateDirectorVoteData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(UpdateDirectorVoteData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //CreateDataDirectorVote
    builder.addCase(CreateDirectorVoteData.pending, (state) => {
      state.isLoadingPatch = true;
    });
    builder.addCase(CreateDirectorVoteData.fulfilled, (state, action) => {
      state.isLoadingPatch = false;
      state.isSuccess = true;
      state.messagePatch = action.payload;
    });
    builder.addCase(CreateDirectorVoteData.rejected, (state, action) => {
      state.isLoadingPatch = false;
      state.isError = true;
      state.messagePatch = action.payload;
    });

    //DeleteDataDirectorVote
    builder.addCase(DeleteDirectorVoteData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteDirectorVoteData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(DeleteDirectorVoteData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetDirectorVote } = DirectorVoteSlice.actions;
export default DirectorVoteSlice.reducer;
