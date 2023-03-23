import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice";

// REDUX PERSİST YANİ KALICI YAPMA
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// reducers
const reducer = combineReducers({
    user: userSlice,
});

const persistConfig = {
    key: "dersprogram",
    storage,
};


// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);


// creating the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export default store;