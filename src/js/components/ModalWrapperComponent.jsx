import React from 'react';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';

export default React.createClass(extend({
	observe() {
		this.forceUpdate();
		this.controller().invalidateModal();
	},
	render() {
		return (<div id="modal-portal"></div>);
	}
}, controllerExtender, reduxExtender, observerExtender));