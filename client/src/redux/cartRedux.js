import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers:{
        addProduct : (state, action) => 
            void(
                state.quantity += 1,
                state.products.push(action.payload),
                state.total += action.payload.price * action.payload.quantity,
                console.log(action.payload.price)
            ),
        clearCart: (state) => 
            void (
                (state.products = []),
                (state.quantity = 0),
                (state.total = 0)
            ),
        removeItem: (state, action) => 
            void (
                (state.total = 0),
                (state.quantity > 0) && (state.quantity -= 1),  
                (state.products.splice(action.payload , 1))
                // state.products.splice(
                //     state.products.findIndex(item => item._id === action.payload), 1
                // )
            )
    }
});

export const {removeItem, addProduct, clearCart} = cartSlice.actions

export default cartSlice.reducer;