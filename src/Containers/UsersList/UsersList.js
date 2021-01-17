import User from "../../Components/User/User";
import React from "react";
import axios from "axios";
import "./UsersList.css";
import DisplayUser from "../DisplayUser/DisplayUser";

import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

class UsersList extends React.Component {
  state = {
    users: [
      {
        id: null,
        login: null,
      },
    ],
    selected: null,
    since: 0,

    loading: false,
  };

  loadUsers(since) {
    axios
      .get("/api/users?since=" + since)
      // .get("/api/users?since=5")
      .then((res) => {
        return this.setState({ users: res.data });
      })
      .catch((err) => console.error(err));
    this.setState({ loading: false });
  }
  componentDidMount() {
    if (this.state.since === 0) this.loadUsers(this.state.since);
    console.log("[userlist] mounted");
  }
  selectUserHandler(username) {
    this.setState({ selected: username });
  }
  nextButtonHandler() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      let page = this.state.since;
      page = page + 10;
      this.setState({ since: page });
      this.loadUsers(page);
    }
  }
  backButtonHandler() {
    if (this.state.since >= 10) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        let page = this.state.since;
        page = page - 10;
        this.setState({ since: page });
        this.loadUsers(page);
      }
    }
  }
  render() {
    return (
      <div className="userList">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users ? (
              this.state.users.map((user) => {
                return (
                  <User
                    key={user.id}
                    id={user.id}
                    login={user.login}
                    clicked={() => this.selectUserHandler(user.login)}
                  />
                );
              })
            ) : (
              <h1>Loading users...</h1>
            )}
          </tbody>
          <div className="buttons">
            <button
              onClick={() => {
                this.backButtonHandler();
              }}
              className="arrow"
            >
              <GoArrowLeft />
            </button>
            <button
              onClick={() => {
                this.nextButtonHandler();
              }}
              className="arrow"
            >
              <GoArrowRight />
            </button>{" "}
          </div>
        </table>

        {this.state.selected ? (
          <DisplayUser selected={this.state.selected} />
        ) : (
          <p> Select a user</p>
        )}
      </div>
    );
  }
}

export default UsersList;
