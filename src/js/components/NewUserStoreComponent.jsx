import React from 'react';
import classNames from 'classnames';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';
import * as DOMUtils from 'utils/dom';

const ListItemComponent = React.createClass({
	renderName: function() {
		if (this.props.name) {
			return this.props.name;
		} else {
			return <span><label>ID:</label>{ this.props.id }</span>
		}
	},
	render() {
		let itemClasses = classNames({
			'user-item': true,
			'selected': this.props.selected
		});
		let statusClassName = classNames({
			'user-item__status': true,
			'user-item__status--enabled': this.props.enabled
		});

		return (
			<li style={this.props.style} className={itemClasses} data-userid={this.props.id}>
				<div className="user-item__logo"></div>
				<div className={ statusClassName }></div>
				<div className="user-item__info">
					<div className="user-item__name">{ this.renderName() }</div>
					<div className="user-item__email"><label>Email:</label>{ this.props.email || '-' }</div>
				</div>
			</li>
		);
	}
});

export default React.createClass(extend({
	componentDidMount() {
		this.controller().componentMounted(this.rootElement);
	},
	observe() {
		this.forceUpdate();
	},
	componentWillUnmount() {
		this.controller().componentWillUnmount(this.rootElement);
	},
	_onClick(evt) {
		let item = DOMUtils.closest(evt.target, ('li'));
		
		if (item && this.rootElement.contains(item)) {
			this.controller().selectUserHandler(item.dataset.userid);
		};
	},
	renderUsers(users, selectedID) {
		return users.map((user) => {
			return <ListItemComponent key={user.id} selected={user.id === selectedID} {...user} />
		});
	},
	render: function() {
		let {newUsers, selectedID} = this.redux().state.users;
		let visibleUsers = [...newUsers].reverse();
		let cssClasses = {
			"users-list": true,
			"users-list-new": true,
			"e1": false,
			"e2": false,
			"e3": false
		};

		visibleUsers.forEach((e, i) => {
			cssClasses[`e${i+1}`] = true;
		});

		return (
			<div className={classNames(cssClasses)} ref={(element) => this.rootElement = element} onClick={ this._onClick }>
				<div className="head-panel">New users <span className="close" onClick={ this.controller().clearListHandler}>&#10006;</span></div>
				<ul>{ this.renderUsers(visibleUsers, selectedID) }</ul>
			</div>
		);
	}
}, controllerExtender, reduxExtender, observerExtender));