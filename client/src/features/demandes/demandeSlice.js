import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks } from "../book/bookSlice";
import axios from "../../axios/axiosAdminConfig";

export const addDemande = createAsyncThunk(
  "demandes/addDemande",
  async (demande, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/requests", demande);
      return data.request;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDemandes = createAsyncThunk(
  "demandes/getDemandes",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios("/admin/requests");
      return data.requests;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleDemande = createAsyncThunk(
  "demandes/handleDemande",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.patch(`/admin/requests/${payload.id}`, {
        accepted: payload.accepted,
      });
      await dispatch(getBooks());
      return data.request;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  demandes: [],
};

const bookSlice = createSlice({
  initialState,
  name: "demandes",
  reducers: {
    removeDemande: (state, action) => {
      state.demandes = state.demandes.filter(
        (demande) => demande._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDemandes.fulfilled, (state, action) => {
        state.demandes = action.payload;
      })
      .addCase(addDemande.fulfilled, (state, action) => {
        state.demandes = [...state.demandes, action.payload];
      })
      .addCase(handleDemande.fulfilled, (state, action) => {
        state.demandes = state.demandes.map((demande) => {
          if (demande._id === action.payload._id) {
            return action.payload;
          }
          return demande;
        });
      });
  },
});

export default bookSlice.reducer;
export const { removeDemande } = bookSlice.actions;
