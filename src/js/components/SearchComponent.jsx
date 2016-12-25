import React from 'react';

const SEARCH_BY_EMAIL = 'Search by Email';
const SEARCH_BY_ID = 'Search by ID';

export default React.createClass({
	componentDidMount() {
		this.props.controller.componentMounted(this.rootElement);
		this.unsubscribe = this.store().subscribe(this.update);
	},
	componentWillUnmount() {
		this.unsubscribe();
		this.props.controller.componentWillUnmount(this.rootElement);
	},
	update() {
		if (this.unsubscribe) {
			this.forceUpdate();
		}
	},
	store() {
        return this.props.controller.store;
	},
	toggleDropdown: function () {
		this.props.controller.toggleDropdown();
	},
	toggleSearchBy: function (type) {
		this.props.controller.setSearchBy(type);
	},
	renderSearchBy() {
		return <span className="input-group-addon" id="sizing-addon2">{this.store().getState().search.searchBy}</span>;
	},
	renderDropdownButton() {
		let state = this.store().getState().search;
		let dropdownClass = state.dropdownActive ? 'open' : '';

		return (
			<div className={`input-group-btn ${dropdownClass}`}>
				<button type="button" className="btn btn-default dropdown-toggle" onClick={this.toggleDropdown} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<span className="caret"></span>
					<span className="sr-only">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu dropdown-menu-right">
					<li><a href="#email" onClick={() => { this.toggleSearchBy('@') }} >Email</a></li>
					<li><a href="#id" onClick={() => { this.toggleSearchBy('#') }}>ID</a></li>
				</ul>
			</div>
		);
	},
	renderInput() {
		let searchBy = this.store().getState().search.searchBy;
		let placeholerValue = searchBy === '@' ? SEARCH_BY_EMAIL : SEARCH_BY_ID;
		return <input type="text" disabled={searchBy === '#'} className="form-control" aria-label="..." placeholder={placeholerValue} />
	},
	render: function () {
		return (
			<div className={this.props.className}>
				<div className="input-group">
					{this.renderSearchBy()}
					{this.renderInput()}
					{this.renderDropdownButton()}
				</div>
			</div>
		)
	}
});