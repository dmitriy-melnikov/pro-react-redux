import React, {Component} from "react";

import { withData } from '../hoc-helpers';

import "./item-list.css";


import SwapiService from '../../services/swapi-service';

const { getAllPeople } = new SwapiService();

const ItemList = (props) => {
		const { data, onItemSelected, children: renderLabel } = props;
		const renderItems = (arr) => {
				return arr.map(item => {
						const { id } = item;
						const label = renderLabel(item);
						return (
								<li
										className="list-group-item"
										key={id}
										onClick={() => onItemSelected(id)}
								>
										{label}
								</li>)
				});
		};
		const items =  renderItems(data);
		
		return (
				<ul className="item-list list-group">
						{items}
				</ul>
		);
};



export default withData(ItemList, getAllPeople)