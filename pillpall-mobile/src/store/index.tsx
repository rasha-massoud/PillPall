import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "./slices/reportSlice";

const store = configureStore({
    reducer: {
        report: reportReducer,
    },
});

export default store;