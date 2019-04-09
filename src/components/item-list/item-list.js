import React, { Component } from "react";

import "./item-list.css";

import SwapiService from "../../services/swapi-service";

import Spinner from '../spinner';

export default class ItemList extends Component {

  swapi = new SwapiService();

  state = {
    peopleList: null
  };

  getPeopleList = () => {
				this.swapi.getAllPeople()
      .then(peopleList => this.setState({
        peopleList
      }))
      .catch(err => console.log(err))
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
    const { peopleList } = this.state;
    if(!peopleList) {
      return <Spinner />
    }
    const items =  this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
