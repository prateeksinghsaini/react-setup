import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  user: null,
  token: null,
  message: null,
  loading: false,
  error: null,
  status: null,
};

export const login = createAsyncThunk("login", async (payload) => {
  try {
    const res = await api("/auth/login", payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { callName } = authSlice.actions;
export default authSlice.reducer;
