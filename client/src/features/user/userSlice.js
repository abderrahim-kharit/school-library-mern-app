import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AUTH = createAsyncThunk("user/login", async (payload) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/admin/login`,
    {
      email: payload.email,
      password: payload.password,
    }
  );
  localStorage.setItem("token", data.token);

  return data;
});

const initialState = {
  user: {},
  isLogin: false,
  error: false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  extraReducers: (builder) => {
    builder
      .addCase(AUTH.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(AUTH.rejected, (state, action) => {
        state.error = true;
        state.isLogin = false;
      });
  },
});

export default userSlice.reducer;
