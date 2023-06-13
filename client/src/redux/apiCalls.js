import { publicRequest, userRequest } from "../requestMethods";
import { clearCart, removeItem } from "./cartRedux";
import { addOrder } from "./orderRedux";
import { loginFailure, loginStart, loginSuccess, logoutUser, registerFailure, registerStart, registerSuccess } from "./userRedux";

export const login = async (dispatch, user) => {

    dispatch(loginStart())

    try {
        const res = await publicRequest.post("/auth/login", user)
        
        dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFailure())
        console.log(error);
    }
}
export const logout = async (dispatch, user) => {

    try {        
        dispatch(logoutUser())
        dispatch(clearCart())
    } catch (error) {
        console.log(error);
    }
}

export const removeItemCart = async (dispatch) => {

    try {        
        dispatch(removeItem())
    } catch (error) {
        // console.log("Couldn't remove product");
        console.log(error);
    }
}


export const registerUser = async (dispatch, user) => {

    dispatch(registerStart())

    try {
        const res = await publicRequest.post("/auth/register", user)
        
        dispatch(registerSuccess(res.data))

    } catch (error) {
        console.log(error);
        dispatch(registerFailure())
    }
}

export const createOrder = async (dispatch, order) => {

    try {        
      const res = await userRequest.post("/orders", order)

      dispatch(addOrder(res.data))
      
    //   console.log(res.data)

    } catch (error) {
        console.log(error);
    }
}

