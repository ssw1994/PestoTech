import React from "react";
import "./list-item.component.scss";
export default function ListCard({ item, propKey }) {
  return (
    <div className="list-card">
      <div>{item[propKey]}</div>
      <div>{item.location}</div>
    </div>
  );
}
