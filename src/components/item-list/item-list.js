import React, { Component } from "react";

import "./item-list.css";

import SwapiService from "../../services/swapi-service";

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

export default class ItemList extends Component {

  swapi = new SwapiService();

  state = {
    peopleList: null,
				error: false
  };

		onError = () => {
				this.setState({
						error: true
				})
		};

  getPeopleList = () => {
				this.swapi.getAllPeople()
      .then(peopleList => this.setState({
        peopleList
      }))
      .catch(this.onError)
  };

  componentDidMount() {
    this.getPeopleList();

  }


  renderItems = (arr) => {
				return arr.map(({name, id}) => (
      <li
        className="list-group-item"
        key={id}
        onClick={() => this.props.onItemSelected(id)}
      >
        {name}
      </li>
				));
  };

  render() {
    const { peopleList, error } = this.state;

    if(!peopleList) {
      return !error ? <Spinner /> : <ErrorIndicator />
    }

    const items =  this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
