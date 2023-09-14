import * as type from "../Types/Types";

const initialState = {
  loading:true,
  success:false,
  lead:[]
};
export const leadReducer = (state = initialState, action) => {
    switch (action.type) {
      case type.LEAD_START: {
        return {
          ...state,
          loading: true,
          success:false,
        };
      }
  
      case type.LEAD_SUCCESS: {
        
        return {
          ...state,
          loading: false,
          lead:action.payload.data,
          success:true,
        };
      }
  
      case type.LEAD_FAILED: {
        return {
          ...state,
          lead:[],
          success:false,
        };
      }
  
      default: {
        return {
          ...state,
        };
      }    }
  };
  