import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import { Link } from "react-router-dom";
import parse from "./parse";
import { withRouter } from "react-router-dom";

class ResourceList extends Component {
  constructor(props) {
    super();
    this.state = {
      isFetching: false,
      [props.resource]: [],
      error: null
    };
  }

  componentDidMount() {
    this.setState({ error: null, isFetching: true });
    fetch(`https://swapi.co/api/${this.props.resource}/`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        let resources = response.results;
        console.log("MOUNTING");
        console.log("RECEIVED RESPONSE");
        this.setState({
          [this.props.resource]: resources,
          isFetching: false,
          error: false
        });
      })
      .catch(e => {
        this.setState({
          isFetching: false,
          error: e,
          [this.props.resource]: this.state[this.props.resource]
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state[nextProps.resource]) {
      this.setState({ error: null, isFetching: true });
      fetch(`https://swapi.co/api/${nextProps.resource}/`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          let resources = response.results;
          console.log("RECEIVING PROPS");

          console.log("RECEIVED RESPONSE");

          this.setState({
            [this.props.resource]: resources,
            isFetching: false,
            error: false
          });
        })
        .catch(e => {
          this.setState({
            isFetching: false,
            error: e,
            [this.props.resource]: this.state[this.props.resource]
          });
        });
    }
  }

  render() {
    console.log("RENDERING");

    let resourceArray;

    if (!this.state[this.props.resource]) {
      return null;
    }
    let resources = this.state[this.props.resource];

    resourceArray = resources.map(resource => {
      let id = parse(resource.url);

      return (
        <div key={resource.url}>
          <strong>
            <Link to={`/${this.props.resource}/${id}`}>
              {resource[this.props.name]}
            </Link>
          </strong>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="People">
          <h1>Star Wars {this.props.resource}</h1>
          {this.state.isFetching ? <h2>Loading</h2> : null}
          {resourceArray}
        </div>
      </div>
    );
  }
}

export default withRouter(ResourceList);
