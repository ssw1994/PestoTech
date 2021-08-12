import { ActionStatus } from "../../models/constants";
import * as FINDER_ACTIONS from "../actions/finder.action";
const initialState = {
  userStatus: ActionStatus.none,
  userList: [],
  companyStatus: ActionStatus.none,
  companyList: [],
  listType: null,
  filters: {
    key: null,
  },
};
export default function finder(state = initialState, action) {
  switch (action.type) {
    case FINDER_ACTIONS.FETCHING_USERS:
      return {
        ...state,
        userStatus: ActionStatus.busy,
      };
    case FINDER_ACTIONS.FETCH_USERS_SUCCESS:
      return {
        ...state,
        userStatus: ActionStatus.success,
        userList: action.payload,
      };
    case FINDER_ACTIONS.FETCH_USERS_FAILURE:
      return {
        ...state,
        userStatus: ActionStatus.error,
      };
    case FINDER_ACTIONS.FETCHING_COMPANIES:
      return {
        ...state,
        companyStatus: ActionStatus.busy,
      };
    case FINDER_ACTIONS.FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companyList: action.payload,
        companyStatus: ActionStatus.success,
      };
    case FINDER_ACTIONS.FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        companyStatus: ActionStatus.error,
      };
    case FINDER_ACTIONS.SELECT_LIST_TYPE:
      return {
        ...state,
        listType: action.payload,
      };

    case FINDER_ACTIONS.FILTER_LIST:
      return {
        ...state,
        filters: {
          ...state.filters,
          key: action.payload,
        },
      };
    default:
      return { ...state };
  }
}
