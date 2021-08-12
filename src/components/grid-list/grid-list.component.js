import React from "react";
import { ListTypes } from "../../models/constants";
import { ListItem, ListSearch } from "..";
import { useSelector } from "react-redux";
import {
  filteredList,
  selectedListType,
} from "../../store/selectors/finder.selector";
import "./grid-list.component.scss";
export default function GridList() {
  const gridList = useSelector(filteredList);
  const listType = useSelector(selectedListType);

  return (
    <div className="grid-list">
      <div className="list-filters">
        <ListSearch />
      </div>

      <div className="grid-list-items">
        {gridList.map((item, index) => {
          return (
            <div className="list-item">
              <ListItem
                item={item}
                key={index}
                propKey={listType === ListTypes.user ? "name" : "company"}
              />
            </div>
          );
        })}
        {gridList.length === 0 ? (
          <div className="message">No records found</div>
        ) : null}
      </div>
    </div>
  );
}
