import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { extend, controllerExtender, reduxExtender, observerExtender } from 'utils/react-utils';
import { PAGER_MAX_PAGES_COUNT } from 'utils/const';

const PageComponent = React.createClass({
	_onClick() {
		this.props.click(this.props.index);
	},
	render() {
		let { active, index } = this.props;
		return (
			<li className={classNames({ active })} onClick={this._onClick}>
				<a href={`#page${index}`}>{index + 1}</a>
			</li>
		);
	}
});

const SkipButtonComponent = React.createClass({
	_onClick() {
		this.props.click(this.props.skip);
	},
	_markup() {
		return { __html: this.props.text }
	},
	render() {
		let {label, text, disabled} = this.props;
		
		return (
			<li className={classNames({ disabled: disabled })}>
				<a href={`#${label}`} onClick={ disabled ? null : this._onClick} aria-label={label}>
					<span aria-hidden="true" dangerouslySetInnerHTML={ this._markup() } />
				</a>
			</li>
		);
	}
});

export default React.createClass(extend({
	observe() {
		this.forceUpdate();
	},
	renderPages() {
		let pages = [];
		let {view, skip, selected} = this.redux().state.paginator;

		for(let i = skip, l = skip + view; i < l; i++) {
			pages.push(<PageComponent key={i} index={i} active={selected ===i} click={this.controller().selectHandler} />);
		};

		return pages;
	},
	render: function () {
		let {canBackward, canForward, skip} = this.redux().state.paginator;
		return (
			<nav aria-label="Page navigation">
				<ul className="pagination">
					<SkipButtonComponent label={'Previous'} text={'&laquo;'} skip={skip - 1} disabled={!canBackward} click={this.controller().backwardHandler} />
					{ this.renderPages() }
					<SkipButtonComponent label={'Next'} text={'&raquo;'} skip={skip + 1} disabled={!canForward} click={this.controller().forwardHandler}/>
				</ul>
			</nav>
		);
	}
}, controllerExtender, reduxExtender, observerExtender));