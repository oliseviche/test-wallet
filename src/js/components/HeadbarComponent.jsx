import React from 'react';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';

export default React.createClass(extend({
	_createUserClick() {
		this.controller().showCreateUserModal();
	},
	render: function () {
		return (
			<div className="headbar">
				<img src="https://developers.xsolla.com/images/xsolla-logo_white.32fcd56912.svg" width="50" height="50" />
				<h4>Wallet Demo</h4>
				<button type="button" className="btn btn-primary" onClick={this._createUserClick}>Create User</button>
			</div>
		);
	}
}, controllerExtender));