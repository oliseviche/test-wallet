import React from 'react';
import classNames from 'classnames';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';
import {WORKSPACE_CONST} from 'utils/const';

export default React.createClass({
	componentWillMount() {
		this.activeTab = this.props.store.getState().workspace.tab;
	},
	componentDidMount() {
		this.unsubscribe = this.props.store.subscribe(() => {
			if(this.unsubscribe) {
				this.update();
			}
		});
	},
	componentWillUnmount() {
		this.unsubscribe = this.unsubscribe();
	},
	update() {
		let {tab} = this.props.store.getState().workspace;
		if(this.activeTab !== tab) {
			this.activeTab = tab;
			this.forceUpdate();
		}
	},
	render() {
		let component = this.activeTab === WORKSPACE_CONST.DETAILS ? this.props.userInfo : this.props.operationsInfo;
		return (component || null);
	}
});