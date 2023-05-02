import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

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

    // dispatch(loginStart())

    try {
        const res = await publicRequest.post("/auth/login")
        
        // dispatch(loginSuccess(res.data))
        dispatch(logout(res.data))

    } catch (error) {
        dispatch(loginFailure())
    }
}