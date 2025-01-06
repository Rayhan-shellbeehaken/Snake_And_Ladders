import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    position : 0
};

export const pawnSlice = createSlice({
        name : 'pawn',
        initialState,
        reducers : {
            changePostion : (state, action) => {
                if(state.position + action.payload <= 100) state.position = state.position + action.payload;
            },
            reducePositiion : (state, action) => {
                if(state.position - action.payload >= 1) state.position = state.position - action.payload;
            }
        }
    }
)

export const {changePostion, reducePositiion} = pawnSlice.actions;

export default pawnSlice.reducer;