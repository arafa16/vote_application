import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  dataReport: any;
  data_attribute: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoadingReport: boolean;
  message: string;
  messageReport: string;
}

const initialState: variabel = {
  data: null,
  dataReport: null,
  data_attribute: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingReport: false,
  message: "",
  messageReport: "",
};

export const GetStatusVotingTable: any = createAsyncThunk(
  "StatusVoting/GetStatusVotingTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/status_voting/table?${datas}`,
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

export const GetStatusVotingTableReport: any = createAsyncThunk(
  "StatusVoting/GetStatusVotingTableReport",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/status_voting/table_report?${datas}`,
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

export const GetStatusVotingTableAttribute: any = createAsyncThunk(
  "StatusVoting/GetStatusVotingTableAttribute",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/status_voting/table_attribute`,
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

export const StatusVotingSlice = createSlice({
  name: "StatusVoting",
  initialState,
  reducers: {
    resetStatusVoting: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetStatusVotingTable
    builder.addCase(GetStatusVotingTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetStatusVotingTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetStatusVotingTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetStatusVotingTableReport
    builder.addCase(GetStatusVotingTableReport.pending, (state) => {
      state.isLoadingReport = true;
    });
    builder.addCase(GetStatusVotingTableReport.fulfilled, (state, action) => {
      state.isLoadingReport = false;
      state.isSuccess = true;
      state.dataReport = action.payload;
    });
    builder.addCase(GetStatusVotingTableReport.rejected, (state, action) => {
      state.isLoadingReport = false;
      state.isError = true;
      state.messageReport = action.payload;
    });

    //GetStatusVotingTableAttribute
    builder.addCase(GetStatusVotingTableAttribute.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      GetStatusVotingTableAttribute.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data_attribute = action.payload;
      },
    );
    builder.addCase(GetStatusVotingTableAttribute.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetStatusVoting } = StatusVotingSlice.actions;
export default StatusVotingSlice.reducer;
