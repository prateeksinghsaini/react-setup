import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

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
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.token = null
      state.message = null
      state.loading = false
      state.error = null
      state.status = null
    }
  },
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
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
