import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAppSliceState {}

const initialState: IAppSliceState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
