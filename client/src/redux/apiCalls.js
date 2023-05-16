import { publicRequest } from "../requestMethods";
import { clearCart } from "./cartRedux";
import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux";

export const login = async (dispatch, user) => {

    dispatch(loginStart())

    try {
        const res = await publicRequest.post("/auth/login", user)
        
        dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFailure())
    }
}
export const logout = async (dispatch, user) => {

    try {        
        dispatch(logoutUser())
        dispatch(clearCart())
    } catch (error) {

    }
}