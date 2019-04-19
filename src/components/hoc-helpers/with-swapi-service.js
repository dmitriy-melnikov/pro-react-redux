import React from 'react';

import { SwapiServiceConsumer } from "../swapi-service-context/"

const withSwapiService = (mapMethodsToProps) => (Wrapped) => {
		return (props) => (
						<SwapiServiceConsumer>
								{
										(swapi) => {
											const serviceProps = mapMethodsToProps(swapi);
											return (
													<Wrapped
															{...props}
															{...serviceProps}
													/>
											)
										}
								}
						</SwapiServiceConsumer>
		)
};

export default withSwapiService