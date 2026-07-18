import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface variabel {
  data: any;
  dataCommissionerDirector: any;
  dataById: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoadingPatch: boolean;
  message: string;
  messageCommissionerDirector: string;
}

const initialState: variabel = {
  data: null,
  dataCommissionerDirector: null,
  dataById: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingPatch: false,
  message: "",
  messageCommissionerDirector: "",
};

export const GetVotingPeriodDatas: any = createAsyncThunk(
  "VotingPeriod/GetVotingPeriodDatas",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/voting_period/datas`,
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

export const GetVotingPeriodTable: any = createAsyncThunk(
  "VotingPeriod/GetVotingPeriodTable",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/table?${datas}`,
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

export const GetVotingPeriodById: any = createAsyncThunk(
  "VotingPeriod/GetVotingPeriodById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/data/${uuid}`,
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

export const GetVotingPeriodNCommissionerNDirectorById: any = createAsyncThunk(
  "VotingPeriod/GetVotingPeriodNCommissionerNDirectorById",
  async (props: any, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/data_commissioner_director?${props}`,
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

export const updateVotingPeriodNCommissionerNDirectorById: any =
  createAsyncThunk(
    "VotingPeriod/updateVotingPeriodNCommissionerNDirectorById",
    async (props: any, thunkAPI) => {
      try {
        const response = await axios.patch(
          import.meta.env.VITE_REACT_APP_API_URL +
            `/api/v1/voting_period/data_commissioner_director/${props.uuid}`,
          props.formData,
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
  "VotingPeriod/GetUpdateAttributeById",
  async (uuid: string, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/update_attributes/${uuid}`,
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

export const UpdateVotingPeriodData: any = createAsyncThunk(
  "VotingPeriod/UpdateVotingPeriodData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/data/${datas.uuid}`,
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
  "VotingPeriod/GetCreateAttribute",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/create_attributes`,
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

export const CreateVotingPeriodData: any = createAsyncThunk(
  "VotingPeriod/CreateVotingPeriodData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_APP_API_URL + `/api/v1/voting_period/data`,
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

export const DeleteVotingPeriodData: any = createAsyncThunk(
  "VotingPeriod/DeleteVotingPeriodData",
  async (datas: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/api/v1/voting_period/data/${datas.uuid}`,
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

export const VotingPeriodSlice = createSlice({
  name: "VotingPeriod",
  initialState,
  reducers: {
    resetVotingPeriod: (state) => initialState,
  },
  extraReducers: (builder) => {
    //GetVotingPeriodDatas
    builder.addCase(GetVotingPeriodDatas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetVotingPeriodDatas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetVotingPeriodDatas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetVotingPeriodTable
    builder.addCase(GetVotingPeriodTable.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetVotingPeriodTable.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(GetVotingPeriodTable.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetVotingPeriodById
    builder.addCase(GetVotingPeriodById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetVotingPeriodById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataById = action.payload;
    });
    builder.addCase(GetVotingPeriodById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //GetVotingPeriodById
    builder.addCase(
      GetVotingPeriodNCommissionerNDirectorById.pending,
      (state) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      GetVotingPeriodNCommissionerNDirectorById.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dataCommissionerDirector = action.payload;
      },
    );
    builder.addCase(
      GetVotingPeriodNCommissionerNDirectorById.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      },
    );

    //updateVotingPeriodNCommissionerNDirectorById
    builder.addCase(
      updateVotingPeriodNCommissionerNDirectorById.pending,
      (state) => {
        state.isLoadingPatch = true;
      },
    );
    builder.addCase(
      updateVotingPeriodNCommissionerNDirectorById.fulfilled,
      (state, action) => {
        state.isLoadingPatch = false;
        state.isSuccess = true;
        state.messageCommissionerDirector = action.payload;
      },
    );
    builder.addCase(
      updateVotingPeriodNCommissionerNDirectorById.rejected,
      (state, action) => {
        state.isLoadingPatch = false;
        state.isError = true;
        state.messageCommissionerDirector = action.payload;
      },
    );

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

    //UpdateVotingPeriodData
    builder.addCase(UpdateVotingPeriodData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateVotingPeriodData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(UpdateVotingPeriodData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
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

    //CreateDataVotingPeriod
    builder.addCase(CreateVotingPeriodData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateVotingPeriodData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(CreateVotingPeriodData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //DeleteDataVotingPeriod
    builder.addCase(DeleteVotingPeriodData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteVotingPeriodData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(DeleteVotingPeriodData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetVotingPeriod } = VotingPeriodSlice.actions;
export default VotingPeriodSlice.reducer;
