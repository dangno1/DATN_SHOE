import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITrashCan {
  value: boolean;
}

const initialState: ITrashCan = {
  value: false,
};

const trashCanSlice = createSlice({
  name: "trashCan",
  initialState,
  reducers: {
    showTrashCan: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { showTrashCan } = trashCanSlice.actions;

export default trashCanSlice.reducer;
