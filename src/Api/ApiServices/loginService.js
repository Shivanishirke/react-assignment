import { privateRequest } from "../ApiConfig/privateRequest";
import { publicRequest } from "../ApiConfig/publicRequest";

export const loginService = async (values) => {
  return await publicRequest.post("/API/Account/authenticate", values);
};

export const logoutService = async () => {
  return await privateRequest.post("/API/Account/Logout");
};
