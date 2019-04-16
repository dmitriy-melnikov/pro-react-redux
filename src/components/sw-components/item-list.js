import React from 'react';

import ItemList from '../item-list';
import { withData } from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';

const {
		getAllPeople,
		getAllPlanets,
		getAllStarships
} = new SwapiService();


const withChildFunction = (Wrapped, fn) => {
		return (props) => {
				return (
						<Wrapped {...props} >
								{fn}
						</Wrapped>
				)
		}
};

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({name, model}) => <span>{name} ({model})</span>;

const PersonList = withData(
		withChildFunction(ItemList, renderName),
		getAllPeople
);

const StarshipList = withData(
		withChildFunction(ItemList, renderModelAndName),
		getAllStarships
);

const PlanetList = withData(
		withChildFunction(ItemList, renderName),
		getAllPlanets
);

export {
		PersonList,
		StarshipList,
		PlanetList
}
