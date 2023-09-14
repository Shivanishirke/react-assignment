import { privateRequest } from "../ApiConfig/privateRequest";

export const leadService = async (payload) => {
 
    return await privateRequest.post("/API/CRM/Leads", payload);
  };
