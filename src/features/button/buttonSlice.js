import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skip : {visible : false},
    roll : {name : "Roll"}
};

export const buttonSlice = createSlice({
        name : 'skip',
        initialState,
        reducers : {
            showButton : (state) => {
                state.skip.visible = true;
                state.roll.name = "Re-roll";
            },
            hideButton : (state) => {
                state.skip.visible = false;
                state.roll.name = "Roll";
            }
        }
    }
)

export const {showButton, hideButton} = buttonSlice.actions;

export default buttonSlice.reducer;