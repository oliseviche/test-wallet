import React from 'react';
import classNames from 'classnames';
import ProgressBar from 'react-progress-bar-plus';
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
			<li className={itemClasses} data-userid={this.props.id}>
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
		this.controller().invalidate();
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
	users() {
		let {users, selectedID} = this.redux().state.users;
		return users.map(user => <ListItemComponent key={user.id} selected={user.id === selectedID} {...user} />);
	},
	render: function() {
		return (
			<div className={this.props.className} ref={(element) => this.rootElement = element} onClick={ this._onClick }>
				<ProgressBar autoIncrement={this.controller().increment()} intervalTime={30} percent={this.controller().percent()} 
							 spinner={false} className={"progressList"} />
				<ul>{ this.users() }</ul>
			</div>
		);
	}
}, controllerExtender, reduxExtender, observerExtender));