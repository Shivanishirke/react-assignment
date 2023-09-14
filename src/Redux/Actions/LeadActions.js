import { leadService  } from "../../Api/ApiServices/LeadServices";
import * as type from "../Types/Types";

export const LeadAction = (body) => async (dispatch) => {
    
    try {
      
      dispatch(returnFunc(type.LEAD_START, {}));
      const { data } = await leadService(body);
     console.log('data', data)
      const payload ={data:data.data}
      dispatch(returnFunc(type.LEAD_SUCCESS,payload));
    } catch (error) {

      dispatch(returnFunc(type.LEAD_FAILED, error.response));
    }
  };
  const returnFunc = (type, payload) => {
    return {
      type: type,
      payload: payload,
    };
  };