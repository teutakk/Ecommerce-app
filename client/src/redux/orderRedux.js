import {createSlice} from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        amount: 0,
    },
    reducers:{
        addOrder : (state, action) => 
            void(
                state.orders.push(action.payload),
                console.log(action.payload)
            )
    }
});

export const {addOrder} = orderSlice.actions

export default orderSlice.reducer;