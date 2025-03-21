import { publicRequest, userRequest } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { getUsersFailure, getUsersStart, getUsersSuccess, loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
// import { addUserFailure, addUserStart, addUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./usersRedux";

export const login = async (dispatch, user) => {

    dispatch(loginStart())

    try {
        const res = await publicRequest.post("/auth/login", user)
        
        dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFailure())
    }
}
export const logoutAdmin = async (dispatch) => {

    try {
        
        dispatch(logout())

    } catch (error) {

    }
}

export const getProducts = async (dispatch) => {

    dispatch(getProductStart())

    try {
        const res = await publicRequest.get("/products")
        
        dispatch(getProductSuccess(res.data))

    } catch (error) {
        dispatch(getProductFailure())
    }
}

export const deleteProducts = async (id, dispatch) => {

    dispatch(deleteProductStart())

    try {
        //delete
        const res = await userRequest.delete(`/products/${id}`)
        
        dispatch(deleteProductSuccess(id))

    } catch (error) {
        dispatch(deleteProductFailure())
    }
}
export const updateProducts = async (id, product, dispatch) => {

    dispatch(updateProductStart())

    try {
        
        const res = await userRequest.put(`/products/${id}`, product)
        
        dispatch(updateProductSuccess(id, res.data))

    } catch (error) {
        dispatch(updateProductFailure())
    }
}
export const addProducts = async (product, dispatch) => {

    dispatch(addProductStart())

    try {
        const res = await userRequest.post(`/products`, product)
        
        dispatch(addProductSuccess(res.data))

    } catch (error) {
        dispatch(addProductFailure())
    }
}

// export const updateUsers = async (id, users, dispatch) => {

//     dispatch(updateUserStart())

//     try {
//         const res = await userRequest.put(`/users/${id}`, users)
        
//         dispatch(updateUserSuccess(id, res.data))

//     } catch (error) {
//         dispatch(updateUserFailure())
//     }
// }
// export const addUsers = async (user, dispatch) => {

//     dispatch(addUserStart())

//     try {
//         const res = await userRequest.post(`/auth/register`, user)
        
//         dispatch(addUserSuccess(res.data))

//     } catch (error) {
//         dispatch(addUserFailure())
//     }
// }