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

const PersonItem =  withSwapiService(withDetails(ItemDetails), mapMethodsToProps);

const PersonDetails = (props) =>
		(
				<PersonItem {...props} >
				<Record field="gender" label="Gender"/>
				<Record field="birthYear" label="Birth year"/>
				<Record field="eyeColor" label="Eye color"/>
		</PersonItem>
);

export default PersonDetails;