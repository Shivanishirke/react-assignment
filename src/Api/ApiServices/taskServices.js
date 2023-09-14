import { privateRequest } from "../ApiConfig/privateRequest";

export const myTaskAssignedToMeService = async (payload) => {
 
    return await privateRequest.post("/API/Task/UserTasksAssignedToMe", payload);
  };


