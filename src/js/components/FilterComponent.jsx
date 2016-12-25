import React from 'react';
import classNames from 'classnames';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';

const PLACEHOLDERS = {
	'@': 'Filter by Email',
	'#': 'Filter by ID'
};

const FilterType = React.createClass({
	render() {
		return <span className="input-group-addon" id="sizing-addon2">{this.props.type}</span>;
	}
});

const FilterInput = React.createClass({
	_onInput(evt) {
		this.props.filterChange(evt.target.value);
	},
	render() {
		let { type, value, placeholder } = this.props;
		return <input type="text" disabled={ type === '#'} className="form-control" defaultValue={value} aria-label="..." placeholder={placeholder} onInput={this._onInput} />
	}
});

const FilterTypeButton = React.createClass({
	_onToggle() {
		this.props.toggle();
	},
	_onSelectEmail() {
		this.props.typeChange('@');
	},
	_onSelectID() {
		this.props.typeChange('#');
	},
	render() {
		let classes = classNames({
			'input-group-btn':true,
			open: this.props.dropdown
		});

		return (
			<div className={classes}>
				<button type="button" className="btn btn-default dropdown-toggle" onClick={this._onToggle} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<span className="caret"></span>
					<span className="sr-only">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu dropdown-menu-right">
					<li><a href="#email" onClick={this._onSelectEmail} >Email</a></li>
					<li><a href="#id" onClick={this._onSelectID}>ID</a></li>
				</ul>
			</div>
		);
	}
});

export default React.createClass(extend({
	componentDidMount() {
		this.controller().componentMounted(this.rootElement);
	},
	componentWillUnmount() {
		this.controller().componentWillUnmount(this.rootElement);
	},
	observe() {
		this.forceUpdate();
	},
	render() {
		let { type, value, dropdown } = this.redux().state.filter
		return (
			<div className='users-search'>
				<div className="input-group">
					<FilterType type={type} />
					<FilterInput type={type} value={value} placeholder={ PLACEHOLDERS[type] } filterChange={this.controller().filterChangeHandler} />
					<FilterTypeButton dropdown={dropdown} toggle={this.controller().toggleHandler} typeChange={this.controller().typeChangeHandler} />
				</div>
			</div>
		)
	}
}, controllerExtender, reduxExtender, observerExtender));