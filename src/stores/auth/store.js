import { createSlice } from "@reduxjs/toolkit";
import { getInfoReduces, loginReduces, logoutReduces } from "./action";
const initialState = {
  logged: localStorage.getItem("t") ? true : false,
  currentUser: undefined,
  loading: false,
  loadingInfo: false,
  errorMessage: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;
      state.errorMessage = "";
      state.logged = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    loginReduces(builder);
    logoutReduces(builder);
    getInfoReduces(builder);
  },
});
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { logout } = actions;
// Export the reducer, either as a default or named export
export default reducer;
