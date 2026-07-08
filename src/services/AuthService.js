import axiosInstance from "../axios/axiosInstance";
import {API_END_POINTS} from "../constants/authConstants";

export const signup = (signupData) => {
    return axiosInstance.post(API_END_POINTS.SIGNUP, signupData); // END POINT, SIGNUP DATA

}
export const login = (loginData) => {
    return axiosInstance.post(API_END_POINTS.LOGIN, loginData);

}