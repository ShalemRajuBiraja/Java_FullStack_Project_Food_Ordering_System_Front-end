
import axiosInstance from "../axios/axiosInstance";
import {API_ENDPOINTS} from "../constants/apiEndPoints";

export const removeCartItem = (cartId) => {

    return axiosInstance.delete(API_ENDPOINTS.DELETE_CART_ITEM, cartId);
}