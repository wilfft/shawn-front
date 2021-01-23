import React from "react";
import "./DisplayUser.css";
import axios from "axios";
import DisplayRepository from "../DisplayRepository/DisplayRepository";

class DisplayUser extends React.Component {
  state = {
    loaded: null,
  };

  loadUser() {
    if (
      this.state.loaded === null ||
      this.state.loaded.login !== this.props.selected
    ) {
      console.log("loading full user");
      axios
        .get(`/api/users/${this.props.selected}/details`)
        .then((res) => this.setState({ loaded: res.data }))
        .catch((err) => console.log(err));
    }
  }

  componentDidUpdate() {
    this.loadUser();
  }

  componentDidMount() {
    this.loadUser();
  }

  render() {
    return (
      <div className="users">
        {this.state.loaded ? (
          <div>
            <h3>Id: {this.state.loaded.id}</h3>
            <p>
              <strong> Login: </strong> {this.state.loaded.login}
            </p>
            <p>
              <strong> Profile url: {"  "}</strong>
              <a
                href={this.state.loaded.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {this.state.loaded.html_url}
              </a>
            </p>
            <p>
              <strong> Login created at:</strong> {this.state.loaded.created_at}
            </p>
            <DisplayRepository selected={this.state.loaded.login} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default DisplayUser;
/*

{this.state.selected ? (
  <DisplayUser selected={this.state.selected} />
) : null}
*/
