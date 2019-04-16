import React from 'react';

import './item-details.css';

import ErrorButton from '../error-button';


const ItemDetails = (props) =>  {
		const { item: { name }, image, detailsRender } = props;
		
				return (
						<div className="item-details card">
								<img className="item-image"
													src={image}/>
								<div className="card-body">
										<h4>{name}</h4>
										<ul className="list-group list-group-flush">
												{
														detailsRender
												}
										</ul>
										<ErrorButton />
								</div>
						</div>
				)
};

export default ItemDetails;
