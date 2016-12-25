import React from 'react';
import classNames from 'classnames';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';
import {WORKSPACE_CONST} from 'utils/const';

//https://www.npmjs.com/package/react-datepicker
export default React.createClass(extend({
	observe() {
		this.forceUpdate();
		this.controller().invalidateNavigator()
	},
	render: function () {
		let {tab} = this.redux().state.workspace;
		let detailsClass = classNames({
			active: tab === WORKSPACE_CONST.DETAILS
		});
		let operationsClass = classNames({
			active: tab === WORKSPACE_CONST.OPERATIONS
		});
		return (
			<div>
				<ul className="nav nav-pills">
					<li role="presentation" className={detailsClass}><a href="#" onClick={this.controller().selectDetailsHandler}>Details</a></li>
					<li role="presentation" className={operationsClass}><a href="#" onClick={this.controller().selectOperationsHandler}>Operations</a></li>
				</ul>
				
			</div>
		);
	}
}, controllerExtender, reduxExtender, observerExtender));