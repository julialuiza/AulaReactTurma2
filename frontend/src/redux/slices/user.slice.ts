import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../services/login.service";

const userInitialState: User = {
  email: "",
  isAdmin: undefined,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    saveLogin(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },
    logout(state) {
      state.email = userInitialState.email;
      state.isAdmin = userInitialState.isAdmin;
    },
  },
});

export const { saveLogin, logout } = userSlice.actions;
export default userSlice.reducer;
