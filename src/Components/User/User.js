import React from "react";
import "./User.css";

const user = (props) => (
  <tr className="userBox" key={props.id}>
    <td className="id">
      <strong> {props.id}</strong>{" "}
    </td>
    <td className="login"> {props.login}</td>
    <td>
      <button onClick={props.clicked} className="seeDetails">
        Details
      </button>
    </td>
  </tr>
);

export default user;
