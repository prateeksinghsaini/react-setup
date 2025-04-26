import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  user: null,
  token: null,
  loading: false,
};

export const login = createAsyncThunk("login", async (payload) => {
  try {
    const res = await api("/auth/login", payload);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const { callName } = authSlice.actions;
export default authSlice.reducer;
