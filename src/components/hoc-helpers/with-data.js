import React, {Component} from "react";

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

const withData = (View) => {
		return class extends Component {
				
				state = {
						data: null,
						loading: true,
						error: false
				};
				
				onError = () => {
						this.setState({
								error: true,
								loading: false
						})
				};
				
				onLoading = () => {
						this.setState({
								loading: true
						})
				};
				
				updateItemList() {
						this.onLoading();
						this.props.getData()
								.then(data => this.setState({
										data,
										loading: false,
										error: false
								}))
								.catch(this.onError)
				}
				
				componentDidMount() {
						this.updateItemList();
				}
				
				componentDidUpdate(prevProps, prevState) {
						if(this.props.getData !== prevProps.getData) {
								this.updateItemList()
						}
				}
				
				render() {
						const {data, error} = this.state;
						
						if (!data) {
								return !error ? <Spinner/> : <ErrorIndicator/>
						}
						
						return (
								<View {...this.props} data={data}/>
						)
				}
		}
};

export default withData