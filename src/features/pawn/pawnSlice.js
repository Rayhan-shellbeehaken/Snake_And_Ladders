import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    position : 0
};

export const pawnSlice = createSlice({
        name : 'pawn',
        initialState,
        reducers : {
            changePostion : (state, action) => {
                state.position = state.position + action.payload
            }
        }
    }
)

export const {changePostion} = pawnSlice.actions;

export default pawnSlice.reducer;