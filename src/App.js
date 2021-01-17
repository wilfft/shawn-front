import React from "react";
import axios from "axios";

import "./App.css";

import UsersList from "./Containers/UsersList/UsersList";

axios.defaults.baseURL = "https://shawn-back.herokuapp.com";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <UsersList />
      </div>
    );
  }
}

export default App;
