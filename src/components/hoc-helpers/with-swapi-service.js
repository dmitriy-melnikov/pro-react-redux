import React from 'react';

import { SwapiServiceConsumer } from "../swapi-service-context/"

const withSwapiService = (Wrapped) => {
		return (props) =>
				<SwapiServiceConsumer>
						{ (swapi) => <Wrapped {...props} swapi={swapi}/> }
				</SwapiServiceConsumer>
};

export default withSwapiService