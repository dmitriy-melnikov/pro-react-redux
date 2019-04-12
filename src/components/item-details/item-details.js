import React, {Component} from 'react';

import './item-details.css';

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from '../error-button';

import SwapiService from "../../services/swapi-service";

export default class ItemDetails extends Component {

		state = {
				item: null,
				loading: true,
				error: false
		};

		swapi = new SwapiService();

		onError = () => {
				this.setState({
						error: true
				})
		};

		onLoading = () => {
				this.setState({
						loading: true
				})
		};

		updatePerson() {
				this.onLoading();
				const {itemId} = this.props;
				if (!itemId) {
						return
				}
				this.swapi
						.getPerson(itemId)
						.then((item) => {
								this.setState({
										item,
										error: false,
										loading: false
								})
						})
						.catch(this.onError)
		}

		componentDidMount() {
				this.updatePerson()
		}

		componentDidUpdate(prevProps, prevState) {
				if(this.props.itemId !== prevProps.itemId) {
						this.updatePerson()
				}
		}

		render() {
				if (!this.state.item) {
						return <span>Select a item from a list</span>
				}
				if (this.state.error) {
						return <ErrorIndicator/>
				}
				if(this.state.loading) {
						return <Spinner/>
				}
				const {
						id,
						name,
						gender,
						birthYear,
						eyeColor
				} = this.state.item;
				//const items = itemView(item);
				return (
						<div className="item-details card">
								<img className="item-image"
													src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
								<div className="card-body">
										<h4>{name}</h4>
										<ul className="list-group list-group-flush">
												<li className="list-group-item">
														<span className="term">Gender</span>
														<span>{gender}</span>
												</li>
												<li className="list-group-item">
														<span className="term">Birth Year</span>
														<span>{birthYear}</span>
												</li>
												<li className="list-group-item">
														<span className="term">Eye Color</span>
														<span>{eyeColor}</span>
												</li>
										</ul>
										<ErrorButton />
								</div>
						</div>
				)
		}
}
