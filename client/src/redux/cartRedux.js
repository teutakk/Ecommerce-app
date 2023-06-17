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
                console.log(action.payload.price),
                console.log("State Total " + state.total),
                console.log("State Quantity " + state.quantity)
            ),
        clearCart: (state) => 
            void (
                (state.products = []),
                (state.quantity = 0),
                (state.total = 0)
            ),
        removeItem: (state, action) => {
            const { productId, quantity, price } = action.payload;
            const updatedProducts = state.products.filter(item => item._id === productId);

            void (
                (state.total>0) && (state.total -= quantity * price),
                // (state.total = 0),
                (state.quantity > 0) && (state.quantity -= 1),  
                state.products.pop(
                    // state.products.findIndex(item => item._id === productId), 1
                    updatedProducts
                ),
                console.log("Action Payload Price " + action.payload.price),
                console.log("Action Payload Quantity " + action.payload.quantity),
                console.log("State Quantity " + state.quantity),
                console.log("State total " + state.total)
            )
        }
    }
});

export const {removeItem, addProduct, clearCart} = cartSlice.actions

export default cartSlice.reducer;