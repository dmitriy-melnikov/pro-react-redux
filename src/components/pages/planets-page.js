import React from 'react';

import ErrorBoundry from '../error-boundry';
import Row from '../row';
import { PlanetList, PlanetDetails} from '../sw-components';

 const PlanetsPage = () => {
		
				const { selectedItem } = this.state;
				return(
						<ErrorBoundry>
								<Row
										left={<PlanetList onItemSelected={this.onItemSelected} />}
										right={
												<PlanetDetails
														itemId={ selectedItem }
												/>
										} />
						</ErrorBoundry>
				
				)
}
