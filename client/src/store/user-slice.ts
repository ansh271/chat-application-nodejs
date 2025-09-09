import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  username: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; username: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
