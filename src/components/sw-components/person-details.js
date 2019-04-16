import React from 'react';

import ItemDetails from '../item-details';
import Record from '../record';

import {withSwapiService, withDetails} from '../hoc-helpers'



const mapMethodsToProps = (swapiService) => {
		return {
		getData: swapiService.getPerson,
		getImgUrl: swapiService.getPersonImage
		}
};

const PersonDetails = withSwapiService(withDetails(ItemDetails, mapMethodsToProps));

const personDetails = (
		<PersonDetails
				itemId={9}
		>
				<Record field="gender" label="Gender"/>
				<Record field="birthYear" label="Birth year"/>
				<Record field="eyeColor" label="Eye color"/>
		</PersonDetails>
);

export default personDetails;