import React from "react";
import "./Repository.css";

const repository = (props) => (
  <tr className="repositoryBox" key={props.id}>
    <td className="td">
      <strong> {props.id}</strong>
    </td>
    <td className="td"> {props.name}</td>
    <td className="td">
      {" "}
      <a href={props.url} target="_blank" rel="noreferrer">
        {props.url}
      </a>
    </td>
  </tr>
);

export default repository;
