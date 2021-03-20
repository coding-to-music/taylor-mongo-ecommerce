import axios from "axios";

//constants
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    //dispatch that we are making a request, loading state goes to true
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    //get userInfo out of state.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //boilerplate needed for the token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //post the request with route, order info, and config
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout())
      console.log("logout! still needs to be implemented");
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};