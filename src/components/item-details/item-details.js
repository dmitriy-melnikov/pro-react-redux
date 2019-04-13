import React, {Component, Children, cloneElement} from 'react';

import './item-details.css';

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ErrorButton from '../error-button';

const Record = ({item, field, label}) => {
		return(
				<li className="list-group-item">
						<span className="term">{label}</span>
						<span>{item[field]}</span>
				</li>
		)
};

export {
		Record
}

export default class ItemDetails extends Component {

		state = {
				item: null,
				image: null,
				loading: true,
				error: false
		};


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

		updateItem() {
				this.onLoading();
				const {itemId, getData, getImageUrl} = this.props;
				if (!itemId) {
						return
				}
				getData(itemId)
						.then((item) => {
								this.setState({
										item,
										image: getImageUrl(item),
										error: false,
										loading: false
								})
						})
						.catch(this.onError)
		}

		componentDidMount() {
				this.updateItem()
		}

		componentDidUpdate(prevProps, prevState) {
				if(this.props.itemId !== prevProps.itemId) {
						this.updateItem()
				}
		}

		render() {
				const {item, image} = this.state;
				if (!this.state.item) {
						return <span>Select a item from a list</span>
				}
				if (this.state.error) {
						return <ErrorIndicator/>
				}
				if(this.state.loading) {
						return <Spinner/>
				}
				const {name} = item;
				console.log('item from i-d render', item);
				
				return (
						<div className="item-details card">
								<img className="item-image"
													src={image}/>
								<div className="card-body">
										<h4>{name}</h4>
										<ul className="list-group list-group-flush">
												{
														Children.map(this.props.children, (child) => {
																return cloneElement(child, {item});
														})
												}
										</ul>
										<ErrorButton />
								</div>
						</div>
				)
		}
}
