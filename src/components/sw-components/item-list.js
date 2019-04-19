import React from 'react';

import ItemList from '../item-list';
import { withData, withSwapiService, compose, withChildFunction } from '../hoc-helpers';

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({name, model}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapi) => {
		return {
				getData: swapi.getAllPeople
		}
};

const mapPlanetMethodsToProps = (swapi) => {
		return {
				getData: swapi.getAllPlanets
		}
};

const mapStarshipMethodsToProps = (swapi) => {
		return {
				getData: swapi.getAllStarships
		}
};

const PersonList = compose(
		withSwapiService(mapPersonMethodsToProps),
		withData,
		withChildFunction(renderName)
)(ItemList);

const StarshipList = withSwapiService
		(mapStarshipMethodsToProps)
		(withData(withChildFunction(renderModelAndName)(ItemList))
);

const PlanetList = withSwapiService
		(mapPlanetMethodsToProps)
		(withData(withChildFunction(renderName)(ItemList))
);

export {
		PersonList,
		StarshipList,
		PlanetList
}
