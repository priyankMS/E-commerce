import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import api from "../../uitility/api";
import { isTokenExpired } from "../../uitility/tokenUtility";

export type FieldType = {
  email: string;
  password: string;
};

type initialStateType = {
  isAuthentication: boolean;
  refresh_token: string | null;
  access_token: string | null;
  userName: string;
  error: string | null;
};
//&& !!localStorage.getItem('refresh_token')

const token = localStorage.getItem("access_token");
const validateToken = isTokenExpired(token);

const initialState: initialStateType = {
  isAuthentication: !validateToken,
  refresh_token: localStorage.getItem("refresh_token"),
  access_token: localStorage.getItem("access_token"),
  userName: "",
  error: null,
};

//ayncthunk user login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData: FieldType, { rejectWithValue }) => {
    try {
      const response = await api.post("login", userData);
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return { access_token, refresh_token };
    } catch (error) {
      return rejectWithValue("invalid credential");
    }
  }
);

export const AuthSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthentication = false;
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthentication = true;
      state.error = null;
      toast.success("login sucessfull");
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuthentication = false;
      state.error = action.payload as string;
      toast.error(state.error);
    });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
