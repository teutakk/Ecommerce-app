// import { createSlice } from "@reduxjs/toolkit"

// const usersSlice = createSlice({
//     name: "product",
//     initialState: {
//       users : [],
//       isFetching: false,
//       error: false
//     },
//     reducers:{
        
//         //Update
//         updateUserStart: (state) => {
//             state.isFetching = true
//             state.error = false
//         },
//         updateUserSuccess: (state, action) => {
//             state.isFetching = false
//             state.users[
//             state.users.findIndex((item) => item._id === action.payload)] 
//             = action.payload.users
//         },
//         updateUserFailure: (state) => {
//             state.isFetching = false
//             state.error = true
//         },
//         //Create
//         addUserStart: (state) => {
//             state.isFetching = true
//             state.error = false
//         },
//         addUserSuccess: (state, action) => {
//             state.isFetching = false
//             state.users.push(action.payload)
//         },
//         addUserFailure: (state) => {
//             state.isFetching = false
//             state.error = true
//         },
//     }
// });

// export const {
   
//     updateUserStart,
//     updateUserSuccess,
//     updateUserFailure,
//     addUserStart,
//     addUserSuccess,
//     addUserFailure


// } = usersSlice.actions

// export default usersSlice.reducer;