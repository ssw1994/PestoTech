import * as FINDER_ACTIONS from "../actions/finder.action";
import finderservice from "../../services/finder.service";
import { ListTypes } from "../../models/constants";
export function fetchUsers() {
  return (dispatch) => {
    dispatch({ type: FINDER_ACTIONS.FETCHING_USERS });
    finderservice
      .fetchUserList()
      .then((response) =>
        dispatch({
          type: FINDER_ACTIONS.FETCH_USERS_SUCCESS,
          payload: response.data,
        })
      )
      .catch((error) => dispatch({ type: FINDER_ACTIONS.FETCH_USERS_FAILURE }));
  };
}

export function fetchCompanies() {
  return (dispatch) => {
    dispatch({ type: FINDER_ACTIONS.FETCHING_COMPANIES });
    finderservice
      .fetchCompanyList()
      .then((response) =>
        dispatch({
          type: FINDER_ACTIONS.FETCH_COMPANIES_SUCCESS,
          payload: response.data,
        })
      )
      .catch((error) =>
        dispatch({ type: FINDER_ACTIONS.FETCH_COMPANIES_FAILURE })
      );
  };
}

export function setCurrentListType(listType) {
  return (dispatch) => {
    dispatch({ type: FINDER_ACTIONS.SELECT_LIST_TYPE, payload: listType });
    if (listType === ListTypes.user) {
      dispatch(fetchUsers());
    } else if (listType === ListTypes.company) {
      dispatch(fetchCompanies());
    }
  };
}

export function updateSearch(search) {
  return (dispatch) => {
    dispatch({ type: FINDER_ACTIONS.FILTER_LIST, payload: search });
  };
}

export function clearSearch() {
  return (dispatch) => {
    dispatch({ type: FINDER_ACTIONS.FILTER_LIST, payload: "" });
  };
}
