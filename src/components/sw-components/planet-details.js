import React from 'react';

import ItemDetails from '../item-details';
import Record from '../record';

import { withSwapiService, withDetails } from '../hoc-helpers'

const mapMethodsToProps = (swapiService) => {
		return {
				getData: swapiService.getPlanet,
				getImgUrl: swapiService.getPlanetImage
		}
};

const PlanetItem = withSwapiService(mapMethodsToProps)(withDetails(ItemDetails));

const PlanetDetails = (props) => (
		<PlanetItem {...props}>
				<Record field="population" label="Population" />
				<Record field="rotationPeriod" label="Rotation period" />
				<Record field="diameter" label="Diameter" />
		</PlanetItem>
);

export default PlanetDetails