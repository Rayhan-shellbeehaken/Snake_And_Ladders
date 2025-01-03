import { configureStore } from "@reduxjs/toolkit";
import lockReducer from '../features/lock/lockSlice';
import buttonReducer from '../features/button/buttonSlice';
import pawnReducer from '../features/pawn/pawnSlice';

export const store = configureStore({
    reducer : {
        lock : lockReducer,
        button : buttonReducer,
        pawn : pawnReducer
    }
});