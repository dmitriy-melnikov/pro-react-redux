import React from 'react';

import { withDetails }  from '../hoc-helpers';
import ItemDetails from '../item-details';

import SwapiService from '../../services/swapi-service';

const { getPlanetImage, getStarshipImage, getPlanet, getStarship
} = new SwapiService();


const StarshipDetails = withDetails(ItemDetails, getStarship, getStarshipImage);

const PlanetDetails = withDetails(ItemDetails, getPlanet, getPlanetImage);

export {
		StarshipDetails,
		PlanetDetails
}