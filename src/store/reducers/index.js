import { combineReducers } from "redux";
import finder from "./finder.reducer";
const appReducer = combineReducers({
  finder,
});

export default appReducer;
