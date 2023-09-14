import { combineReducers } from "redux";
import { leadReducer } from "./LeadReducer";

import { loginReducer, logoutReducer } from "./LoginReducer";
import { taskAssignedToMeReducer } from "./TaskReducer";
export default combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  taskAssignedToMe:taskAssignedToMeReducer,
  lead: leadReducer,
});
