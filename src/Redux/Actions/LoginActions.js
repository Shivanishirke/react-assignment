import { loginService, logoutService } from "../../Api/ApiServices/loginService";
import * as type from "../Types/Types";
import axios from 'axios'

export const loginAction = (values) => async (dispatch) => {
  console.log('values',"Basic "+ btoa(values.username+":"+values.password))
  try {
    dispatch(returnFunc(type.LOGIN_START, {}));
    const {data} = await loginService(values);
    const payload ={data:data,
      values:values}
    dispatch(returnFunc(type.LOGIN_SUCCESS,payload));
  } catch (error) {
    dispatch(returnFunc(type.LOGIN_FAILED, error.response.data.message));
  }
};
const returnFunc = (type, payload) => {
  return {
    type: type,
    payload: payload,
  };
};

export const logoutAction = () => async (dispatch) => {
  // console.log('values',"Basic "+ btoa(values.username+":"+values.password))
  try {
    dispatch(returnFunc(type.LOGOUT_START, {}));
    const data = await logoutService();
    dispatch(returnFunc(type.LOGOUT_SUCCESS));
  } catch (error) {
    dispatch(returnFunc(type.LOGOUT_FAILED, error.response.data.message));
  }
};
