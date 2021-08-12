import React, { useState, useEffect } from "react";
import { ListTypes } from "../../models/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearch,
  clearSearch,
} from "../../store/dispatchers/finder.dispatch";
import {
  currentSearch,
  selectedListType,
} from "../../store/selectors/finder.selector";
import { setCurrentListType } from "../../store/dispatchers/finder.dispatch";

import "./list-search.component.scss";
export default function ListSearch() {
  const dispatch = useDispatch();
  const listType = useSelector(selectedListType);

  const [searchFor, setSearchFor] = useState("");
  const presentSearch = useSelector(currentSearch);

  const setListType = (listType) => {
    dispatch(setCurrentListType(listType));
  };

  useEffect(() => {
    dispatch(setCurrentListType(ListTypes.user));
  }, []);

  const search = () => {
    dispatch(updateSearch(searchFor));
  };
  const clear = () => {
    dispatch(clearSearch());
    setSearchFor("");
  };
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchFor}
        onChange={(e) => setSearchFor(e.target.value)}
        placeholder="Search for name or location"
      />
      <div className="action-btns">
        <button onClick={(e) => search()} disabled={!searchFor}>
          Search
        </button>
        <button
          onClick={(e) => clear()}
          disabled={!searchFor && !presentSearch}
        >
          Clear
        </button>
      </div>
      <div className="list-type">
        <input
          type="radio"
          id="user"
          name="type"
          value={ListTypes.user}
          checked={listType === ListTypes.user}
          onChange={(e) => setListType(e.target.value)}
        />
        <label htmlFor="user">Users</label>
        <input
          type="radio"
          id="company"
          name="type"
          value={ListTypes.company}
          checked={listType === ListTypes.company}
          onChange={(e) => setListType(e.target.value)}
        />
        <label htmlFor="company">Company</label>
      </div>
    </div>
  );
}
