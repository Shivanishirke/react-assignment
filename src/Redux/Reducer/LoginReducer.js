import * as type from "../Types/Types";

const initialState = {
  isAuthorized: localStorage.getItem("user") ? true : false,
  isLoading: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_START: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: true,
      };
    }
   
    case type.LOGIN_SUCCESS: {
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("userId", action.payload.data.userDetail.data.UserId);
      let token = "Basic "+ btoa(action.payload.values.username+":"+action.payload.values.password)
      // console.log('action.payload.data.userDetails.userId',action.payload.data.userDetail.data.UserId)
      localStorage.setItem("token",token);
      return {
        ...state,
        isAuthorized: true,
        isLoading: false,
      };
    }

    case type.LOGIN_FAILED: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};


export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGOUT_START: {
      return {
        ...state,
        isAuthorized: true,
        isLoading: true,
      };
    }

    case type.LOGOUT_SUCCESS: {
      localStorage.removeItem("user");    
      localStorage.removeItem("token");
    
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
      };
    }

    case type.LOGOUT_FAILED: {
      return {
        ...state,
        isAuthorized: true,
        isLoading: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
