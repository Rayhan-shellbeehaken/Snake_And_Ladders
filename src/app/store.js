import { configureStore } from "@reduxjs/toolkit";
import lockReducer from '../features/lock/lockSlice';
import buttonReducer from '../features/button/buttonSlice';

export const store = configureStore({
    reducer : {
        lock : lockReducer,
        button : buttonReducer
    }
});