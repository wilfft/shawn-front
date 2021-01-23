import User from "../../Components/User/User";
import React from "react";
import axios from "axios";
import DisplayUser from "../DisplayUser/DisplayUser";

import { Switch, Route } from "react-router";
import UsersList from "../UsersList/UsersList";

class Home extends React.Component {
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

  render() {
    return (
      <div className="userList">
        <Switch>
          <Route path="/" exact component={UsersList} />
          <Route path="/api/users?since=" component={DisplayUser} />
          <Route path="/posts" render={() => <h1>teste</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Home;
