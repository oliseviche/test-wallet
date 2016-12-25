import React from 'react';
import ProgressBar from 'react-progress-bar-plus';
import classNames from 'classnames';
import moment from 'moment';
import currenctFormatter from 'currency-formatter';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';
import {WORKSPACE_CONST} from 'utils/const';

const USER_ACTIVE = 'Active';
const USER_DISABLED = 'Disabled';
const DATETIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

export default React.createClass(extend({
	componentDidMount() {
		this.controller().componentMounted(this.rootElement);
	},
	observe() {
		this.controller().invalidate();
		this.forceUpdate();
	},
	componentWillUnmount() {
		this.controller().componentWillUnmount(this.rootElement);
	},
	_onClickUserUpdate() {
		this.props.controller.openUpdateUserModal();
	},
	_onClickBalanceUpdate() {
		this.props.controller.openUpdateBalanceModal();
	},
	user(user) {
		let balance = classNames({
			positive: user.balance > 0,
			negative: user.balance < 0
		});
		let active = classNames({
			positive: user.enabled,
			negative: !user.enabled
		});
		return (
			<div className="user-details">
				<ProgressBar autoIncrement={this.controller().increment()} intervalTime={30} percent={this.controller().percent()} 
							 spinner={false} className={"progressDetails"} />
				<a id="update_user" href="#Details"></a><a id="update_balance" href="#Balance"></a>
				<h4 id="Details">Details</h4>
				<button className="btn btn-success" onClick={ this._onClickUserUpdate }>Update</button>
				<div className="well">
					<div>
						<label>ID</label>
						<p>{user.id}</p>
					</div>	
					<div>
						<label>Name</label>
						<p>{user.name}</p>
					</div>
					<div>
						<label>Custom</label>
						<p>{user.custom}</p>
					</div>
					<div>
						<label>Email</label>
						<p>{user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : ''}</p>
					</div>
					<div>
						<label>Register date</label>
						<p>{moment(user.register_date).format(DATETIME_FORMAT)}</p>
					</div>
					<div>
						<label>Status</label>
						<p className={active}>{user.enabled ? USER_ACTIVE : USER_DISABLED}</p>
					</div>
				</div>
				<h4 id="Balance">Balance</h4>
				<button className="btn btn-success" onClick={ this._onClickBalanceUpdate }>Update</button>
				<div className="well">
					<div>
						<label>Balance</label>
						<p className={ balance }>{user.balance.toFixed(2)}</p>
					</div>
					<div>
						<label>Amount</label>
						<p>{currenctFormatter.format(user.amount, {code: user.currency, format: '%s %v'})}</p>
					</div>
				</div>
			</div>
		);
	},
	render: function() {
		let {tab} = this.redux().state.workspace;

		if (tab !== WORKSPACE_CONST.DETAILS) {
			return null;
		}

		let { fetching, user, ID } = this.redux().state.user;
		let renderer;

		if (null === ID) {
			return null;
		}

		return this.user(user);
	}
}, controllerExtender, reduxExtender, observerExtender));