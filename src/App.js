import React from "react";
import axios from "axios";
import "./App.css";
import UsersList from "./Containers/UsersList/UsersList";
import { BrowserRouter } from "react-router-dom";
import Home from "./Containers/Home/Home";
axios.defaults.baseURL = "https://shawn-back.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:2000";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
