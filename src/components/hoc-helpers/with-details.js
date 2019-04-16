import React, {Component, Children, cloneElement} from "react";

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

const withDetails = (View, mappedFn) => {
		return class extends Component {
				
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
						const {itemId, swapi} = this.props;
						const {getData, getImgUrl} = mappedFn(swapi);
						if (!itemId) {
								return
						}
						getData(itemId)
								.then((item) => {
										this.setState({
												item,
												image: getImgUrl(item),
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
						const { item, image, error, loading } = this.state;
						const { children: renderLabel } = this.props;
						
						
						if (!item) {
								return <span>Select a item from a list</span>
						}
						if (error) {
								return <ErrorIndicator/>
						}
						if(loading) {
								return <Spinner/>
						}
						
						const renderFields = (labels) => {
								return Children.map(labels, (child) => {
										return cloneElement(child, {item});
								})
						};
						
						const detailsRender = renderFields(renderLabel);
						
						return(
								<View {...this.props} image={image}  item={item} detailsRender={detailsRender}/>
						)
				}
		}
};

export default withDetails