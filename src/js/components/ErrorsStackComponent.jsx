import React from 'react';
import classNames from 'classnames';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';

const ErrorItem = React.createClass({
	_onClick() {
		this.props.clickHandler(this.props.id);
	},
	render() {
		let message = this.props.exception.message || 'Oops, something went wrong.';
		return (
				<div className="error-island" title={message}>
					<span className="close" onClick={this._onClick}>&#10006;</span>
					<span className="error-message">{message}</span>
					<a className="report" href="#Report">Report</a>
				</div>
			);
	}
});

export default React.createClass(extend({
	componentDidMount() {
	},
	componentWillUnmount() {
	},
	observe() {
		this.forceUpdate();
	},
	renderErrors() {
		let {errors} = this.redux().state.errors;
		return errors.slice(-3).map((error) => {
			return (
				<ErrorItem key={error.id} id={error.id} clickHandler={this.controller().closeErrorHandler} exception={error.exception} />
			);
		});
	},
	render() {
		return (
			<div className='errors-stack'>
				{this.renderErrors()}
			</div>
		)
	}
}, controllerExtender, reduxExtender, observerExtender));