import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/user"
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { wishlistReducer } from "./reducers/wishlist";
import { cartReducer } from "./reducers/cart";

const Store = configureStore({
    reducer:{
        user: userReducer,
        seller: sellerReducer,
        products:productReducer,
        events: eventReducer,
        wishlist: wishlistReducer,
        cart: cartReducer
    }
})

export default Store;