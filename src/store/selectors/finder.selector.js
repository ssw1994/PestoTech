import { ListTypes } from "../../models/constants";
const fullCheckRegex = /^".*"$/im;

export const finderList = (state) => {
  if (state.finder.listType === ListTypes.user) {
    return state.finder.userList;
  } else {
    return state.finder.companyList;
  }
};

export const selectedListType = (state) => {
  return state.finder.listType;
};

export const currentSearch = (state) => {
  return state.finder.filters.key;
};

function isSortedArray(arr, n) {
  if (n === 1 || n === 0) return 1;
  if (arr[n - 1] < arr[n - 2]) return 0;
  return isSortedArray(arr, n - 1);
}

export const filteredList = (state) => {
  if (!state.finder.filters.key) {
    return finderList(state);
  } else {
    if (fullCheckRegex.test(state.finder.filters.key)) {
      const searchKey = currentSearch(state).slice(1, -1);
      return finderList(state).filter((item) => {
        let nameCheck = false;
        if (selectedListType(state) === ListTypes.user) {
          nameCheck = item.name.search(searchKey) >= 0;
        } else {
          nameCheck = item.company.search(searchKey) >= 0;
        }
        return nameCheck || item.location.search(searchKey) >= 0;
      });
    } else {
      const arr = currentSearch(state).split(" ");
      return finderList(state).filter((item) => {
        let path = [];
        if (selectedListType(state) === ListTypes.user) {
          path = arr.map((key) => item.name.search(key));
        } else {
          path = arr.map((key) => item.company.search(key));
        }
        let locationPath = arr.map((key) => item.location.search(key));
        if (
          path.findIndex((i) => i === -1) >= 0 &&
          locationPath.findIndex((i) => i === -1) >= 0
        ) {
          return false;
        } else {
          return (
            isSortedArray(path, path.length) ||
            isSortedArray(locationPath, locationPath.length)
          );
        }
      });
    }
  }
};
