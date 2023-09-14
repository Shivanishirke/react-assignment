import * as type from "../Types/Types";

const initialState = {
  loading:true,
  success:false,
  taskAssignedToMe:[]
};
export const taskAssignedToMeReducer = (state = initialState, action) => {
    switch (action.type) {
      case type.TASK_START: {
        return {
          ...state,
          loading: true,
          success:false,
        };
      }
  
      case type.TASK_SUCCESS: {
        
        return {
          ...state,
          loading: false,
          taskAssignedToMe:action.payload.data,
          success:true,
        };
      }
  
      case type.TASK_FAILED: {
        return {
          ...state,
          taskAssignedToMe:[],
          success:false,
        };
      }
  
      default: {
        return {
          ...state,
        };
      }    }
  };
  