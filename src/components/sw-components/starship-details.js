import React from 'react';

import ItemDetails from '../item-details';
import Record from '../record';

import { withSwapiService, withDetails } from '../hoc-helpers'

const mapMethodsToProps = (swapiService) => {
		return {
				getData: swapiService.getStarship,
				getImgUrl: swapiService.getStarshipImage
		}
};

const StarshipItem = withSwapiService(withDetails(ItemDetails),mapMethodsToProps);

const StarshipDetails = (props) => (
		<StarshipItem {...props}>
				cargoCapacity: starship.cargo_capacity
				<Record field="model" label="Model" />
				<Record field="manufacturer" label="Manufacturer" />
				<Record field="costInCredits" label="Cost in credits" />
				<Record field="length" label="Length" />
				<Record field="crew" label="Crew" />
				<Record field="passengers" label="Passengers" />
				<Record field="cargoCapacity" label="Cargo capacity" />
		</StarshipItem>
);

export default StarshipDetails
