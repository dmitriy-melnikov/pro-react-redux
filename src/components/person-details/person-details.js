import React, {Component} from 'react';

import './person-details.css';

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from '../error-button';

import SwapiService from "../../services/swapi-service";

/*const personView = (person) => {
		console.log('personView', person);
		const {
				id,
				name,
				gender,
				birthYear,
				eyeColor
		} = person;
		console.log(id,
				name,
				gender,
				birthYear,
				eyeColor);
		return (
				<div className="person-details card">
						<img className="person-image"
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
						</div>
				</div>
		)
};*/

export default class PersonDetails extends Component {

		state = {
				person: null,
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
				const {personId} = this.props;
				if (!personId) {
						return
				}
				this.swapi
						.getPerson(personId)
						.then((person) => {
								this.setState({
										person,
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
				if(this.props.personId !== prevProps.personId) {
						this.updatePerson()
				}
		}

		render() {
				if (!this.state.person) {
						return <span>Select a person from a list</span>
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
				} = this.state.person;
				//const items = personView(person);
				return (
						<div className="person-details card">
								<img className="person-image"
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
