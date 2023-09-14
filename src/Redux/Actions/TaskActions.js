import { myTaskAssignedToMeService, getservice } from "../../Api/ApiServices/taskServices";
import * as type from "../Types/Types";

export const taskAction = (body) => async (dispatch) => {
    
    try {
      
      dispatch(returnFunc(type.TASK_START, {}));
      const { data } = await myTaskAssignedToMeService(body);
     
      const payload ={data:data.data}
      dispatch(returnFunc(type.TASK_SUCCESS,payload));
    } catch (error) {

      dispatch(returnFunc(type.TASK_FAILED, error.response));
    }
  };
  const returnFunc = (type, payload) => {
    return {
      type: type,
      payload: payload,
    };
  };

  //get task details
export const getTaskAction = (search, from, to) => async (dispatch) => {
    dispatch({ type:type.TASK_START })
    try {
        const response = await myTaskAssignedToMeService("/API/Task/UserTasksAssignedToMe" + `?search=${search}&from=${from}&to=${to}`)
        dispatch({ type:type.TASK_SUCCESS, payload: response.data })
    }
    catch (error) {
        dispatch({ type:type.TASK_FAILED, payload: error })
    }
}
