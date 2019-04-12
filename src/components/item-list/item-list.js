import React, { Component } from "react";

import "./item-list.css";

//import SwapiService from "../../services/swapi-service";

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

export default class ItemList extends Component {

  //swapi = new SwapiService();

  state = {
    itemList: null,
				error: false
  };

		onError = () => {
				this.setState({
						error: true
				})
		};

  /*getPeopleList = () => {
				this.swapi.getAllPeople()
      .then(itemList => this.setState({
        itemList
      }))
      .catch(this.onError)
  };*/

  componentDidMount() {
  		//debugger;
  		const { getData } = this.props;
				getData()
						.then(itemList => this.setState({
								itemList
						}))
						.catch(this.onError)
  }


  renderItems = (arr) => {
  		//console.log(arr);
				return arr.map(item => {
						const { id } = item;
						const label = this.props.children(item);
						return (<li
								className="list-group-item"
								key={id}
								onClick={() => this.props.onItemSelected(id)}
						>
								{label}
						</li>)
				});
  };

  render() {
    const { itemList, error } = this.state;

    if(!itemList) {
      return !error ? <Spinner /> : <ErrorIndicator />
    }

    const items =  this.renderItems(itemList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
