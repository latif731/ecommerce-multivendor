import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false
}

export const userReducer = createReducer(initialState, {
    loadUserRequest: (state) => {
        state.loading = true
    },
    loadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload
    },
    loadUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    // update user information
    updateUserInfoRequest: (state) => {
        state.loading = true
    },
    updateUserInfoSuccess: (state, action)  => {
        state.loading = false;
        state.user = action.payload
    },
    updateUserInfoFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    }
})

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     isAuthenticated: false,
//     loading:false,
//     user: null,
//     error:null
// }

// const userSlice = createSlice({
//     name:"user",
//     initialState,
//     reducers:{
//         loadUserRequest: (state) => {
//             state.loading = true
//         },
//         loadUserSuccess: (state, action) => {
//             state.isAuthenticated = true;
//             state.loading = false;
//             state.user = action.payload
//         },
//         loadUserFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             state.isAuthenticated = false;
//         },
//         clearErrors: (state) => {
//             state.error = null
//         } 
//     }
// })

// export const {loadUserRequest, loadUserSuccess, loadUserFail, clearErrors} = userSlice.actions
// export default userSlice.reducer;