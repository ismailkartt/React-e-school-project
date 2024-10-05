import { createSlice } from "@reduxjs/toolkit"
import { getMenuItems } from "../../component/login-page/user-menu";

const initialState = {
    isUserLogin: false,
    user: null,
    menu: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state,action) => {
            state.isUserLogin = true;
            state.user = action.payload;
            state.menu = getMenuItems(action.payload.role);
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = null;
            state.menu = [];
        },
        
    }
})

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;

