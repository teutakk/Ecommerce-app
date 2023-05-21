import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const user = JSON.parse(localStorage.getItem("persist:root"))?.user
const currentUser = user && JSON.parse(user).currentUser
const TOKEN = currentUser?.accessToken
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser.accessToken

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user
// const currentUser = user && JSON.parse(user).currentUser
// const TOKEN = currentUser?.accessToken

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjc2MWI4NzhiMmZmNDU3NjA0MTA2MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjM3OTUwMywiZXhwIjoxNjgyNjM4NzAzfQ.ZXOd5TmEKYR8CKxZqgFM918HFgfqfAA1BVk6OfVpkKI
export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})