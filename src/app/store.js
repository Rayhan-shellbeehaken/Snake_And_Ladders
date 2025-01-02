import { configureStore } from "@reduxjs/toolkit";
import lockReducer from '../features/lock/lockSlice';

export const store = configureStore({
    reducer : lockReducer
});