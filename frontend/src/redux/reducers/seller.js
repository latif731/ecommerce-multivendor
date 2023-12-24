import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true
}

export const sellerReducer = createReducer(initialState, {
    loadSellerRequest: (state) => {
        state.isLoading = true
    },
    loadSellerSuccess: (state, action) => {
        state.isSellerAuthenticated = true;
        state.isLoading = false;
        state.seller = action.payload
    },
    loadSellerFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSellerAuthenticated = false;
    },
    clearErrors: (state) => {
        state.error = null
    }
})
