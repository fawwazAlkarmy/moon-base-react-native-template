import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSliceState {
  token: string | null;
}

const initialState: IUserSliceState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUserCredential: (state) => {},
  },
});

export const { removeUserCredential } = userSlice.actions;

export default userSlice.reducer;
