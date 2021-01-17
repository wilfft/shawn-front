import React from "react";
import Repository from "../../Components/Repository/Repository";
import axios from "axios";
import "./DisplayRepository.css";
class DisplayRepository extends React.Component {
  state = {
    loaded: null,
    lastLoaded: null,
  };

  loadRepository() {
    if (
      this.state.loaded === null ||
      this.state.lastLoaded !== this.props.selected
    ) {
      axios
        .get(`/api/users/${this.props.selected}/repos`)
        .then((res) => {
          const repository = res.data;
          this.setState({ lastLoaded: this.props.selected });
          this.setState({ loaded: repository });
        })
        .catch((err) => console.error(err));

      console.log(this.state.lastLoaded);
    }
  }
  componentDidMount() {
    this.loadRepository();
  }
  componentDidUpdate() {
    this.loadRepository();
  }
  render() {
    console.log();
    return (
      <div className="repository">
        <h3 className="titleRepository">
          {this.props.selected}: {"  "}Repositories
        </h3>

        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>url</th>
          </thead>
          <tbody>
            {this.state.loaded
              ? this.state.loaded.map((e) => {
                  return (
                    <Repository
                      key={e.id}
                      id={e.id}
                      name={e.name}
                      url={e.url}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}
export default DisplayRepository;
