import User from "../../Components/User/User";
import React from "react";
import axios from "axios";
import "./UsersList.css";
import DisplayUser from "../DisplayUser/DisplayUser";

import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { Switch, Route } from "react-router";

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
      <>
        <div className="main">
          <div id="content">
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              User List from Github api{" "}
            </h2>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th> Details </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users
                    ? this.state.users.map((user) => {
                        return (
                          <User
                            key={user.id}
                            id={user.id}
                            login={user.login}
                            clicked={() => this.selectUserHandler(user.login)}
                          />
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
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
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default UsersList;
