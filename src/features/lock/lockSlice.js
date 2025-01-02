import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locks : {visible : false}
}

export const lockSlice = createSlice({
    name : 'lock',
    initialState,
    reducers : {
        show : (state) => {
            state.locks.visible = true;
        },
        hide : (state) => {
            state.locks.visible = false;
        }
    }
})

export const {show, hide} = lockSlice.actions;

export default lockSlice.reducer;