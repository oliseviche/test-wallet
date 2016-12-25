import React from 'react';
import DatePicker from  'react-datepicker';
import ProgressBar from 'react-progress-bar-plus';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment';
import currenctFormatter from 'currency-formatter';
import {WORKSPACE_CONST, TRANSACTION_TYPES} from 'utils/const';

const DATETIME_FORMAT = 'MM/DD/YYYY, HH:mm';

const DataRow = React.createClass({
	render() {
		return (
			<tr>
				<th data-title="#">
					<span>{this.props.operation_id}</span>
				</th>
				<td data-title="Transaction">
					<span>{this.props.transaction_id}</span>&nbsp;<span>{this.props.transaction_type}</span>
				</td>
				<td data-title="Coupon">
					<span>{this.props.coupon_id}</span>&nbsp;<span>{this.props.coupon_code}</span>
				</td>
				<td data-title="Comment">
					<span>{this.props.comment}</span>
				</td>
				<td data-title="Date">
					<span>{moment(this.props.date).format(DATETIME_FORMAT)}</span>
				</td>
				<td data-title="Amount">
					<span>{currenctFormatter.format(this.props.amount, {code: this.props.currency, format: '%s %v'})}</span>
				</td>
				<td data-title="Sum">
					<span>{this.props.sum}</span>
				</td>
				<td data-title="Status">
					<span>{this.props.status}</span>
				</td>
				<td data-title="Balance">
					<span>{this.props.user_balance.toFixed(2)}</span>
				</td>
			</tr>
		);
	}
})

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
	renderData(operations) {
		return operations.map((operation) => {
			return <DataRow key={operation.operation_id} {...operation} />
		});
	},
	renderDropdownItems(type) {
		return Object.keys(TRANSACTION_TYPES).map(key => {
			return <MenuItem key={key} eventKey={key} active={type === key}>{TRANSACTION_TYPES[key]}</MenuItem>
		});
	},
	renderTable(fetching, operations) {
		return (
			<div className="table-scroller">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Transaction</th>
							<th>Coupon</th>
							<th>Comment</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Sum</th>
							<th>Status</th>
							<th>Balance</th>
						</tr>
					</thead>
					<tbody>
						{ this.renderData(operations) }
					</tbody>
				</table>
			</div>
		);
	},
	render() {
		let {tab} = this.redux().state.workspace;
		if (tab !== WORKSPACE_CONST.OPERATIONS) {
			return null;
		}

		let {operations, fetching, from, to, type} = this.redux().state.operations;
		return (
			<div className="operations-content" id="no-more-tables">
				<ProgressBar autoIncrement={this.controller().increment()} intervalTime={30} percent={this.controller().percent()} 
							 spinner={false} className={"progressDetails"} />
				<div className="filter-popup">
					<label>From:</label>
					<DatePicker className="react-datepicker" selected={moment(from)} 
								selectsStart 
								startDate={moment(from)} 
								endDate={moment(to)} 
								onChange={this.controller().handleFromChange} />
					<label>To:</label>
					<DatePicker className="react-datepicker" selected={moment(to)} 
								selectsEnd 
								startDate={moment(from)} 
								endDate={moment(to)} 
								onChange={this.controller().handleToChange} />
					<label>Type:</label>
					<DropdownButton title={TRANSACTION_TYPES[type]} id="ttype" onSelect={this.controller().handleTypeChange}>
						{ this.renderDropdownItems(type) }
					</DropdownButton>
				</div>
				{this.renderTable(fetching, operations)}
			</div>
		)
	}
}, controllerExtender, reduxExtender, observerExtender));