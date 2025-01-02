import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skip : {visible : false},
    roll : {name : "Roll"},
    disabled : false
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
            },
            disableButton : (state) => {
                state.disabled = true;
            },
            enableButton : (state) => {
                state.disabled = false;
            }
        }
    }
)

export const {showButton, hideButton, disableButton, enableButton} = buttonSlice.actions;

export default buttonSlice.reducer;