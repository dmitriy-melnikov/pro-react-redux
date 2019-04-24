import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ErrorBoundry from '../error-boundry';
import { PersonList} from '../sw-components';

const PeoplePage  = ({history}) =>  {
		return(
				<ErrorBoundry>
						<PersonList
								onItemSelected={(itemId) => history.push(itemId)}
						/>
				</ErrorBoundry>
				
		)
};

export default withRouter(PeoplePage)
