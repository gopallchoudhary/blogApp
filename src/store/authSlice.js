import { createSlice } from "@reduxjs/toolkit";

/// FOR USER AUTHENTICATION  
const initialState = {
  status: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //!<--Login-->
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },

    //!<--Logout-->
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});

export const {login, logout} = authSlice.actions

export default authSlice.reducer
