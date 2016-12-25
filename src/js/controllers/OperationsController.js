import ComponentController from 'controllers/ComponentController';
import * as ApplicationActions from 'actions/Application';
import moment from 'moment';
import * as DOMUtils from 'utils/dom';
import {EventTypes} from 'utils/const';

export default class OperationsController extends ComponentController {
	constructor(store) {
		super(store);
		let {from, to, type} = this.state.operations;
		this.from = from;
		this.to = to;
		this.type = type;
		this.handleFromChange = this.fromChange.bind(this);
		this.handleToChange = this.toChange.bind(this);
		this.handleTypeChange = this.typeChange.bind(this);
		this.subscribe(EventTypes.userChanged, this.updateScroll.bind(this));
		this.autoIncrement = false;
		this.isFetching = false;
		this.finishPercent = [];
	}
	invalidate() {
		let {from, to, type} = this.state.operations;
		
		if (this.from !== from || this.to !== to || this.type !== type) {
			this.from = from;
			this.to = to;
			this.type = type;
			this.dispatch(ApplicationActions.requestOperationsInfo());
		}

		let {fetching} = this.state.operations;

		if (fetching !== this.isFetching) {
			if (!fetching) {
				this.finishPercent.unshift(100);
			}
			this.autoIncrement = !this.autoIncrement;
			this.isFetching = fetching;
		}
	}
	fromChange(date) {
		let val = moment(date);
		this.dispatch(ApplicationActions.selectOperationsFrom(val));
	}
	toChange(date) {
		let val = moment(date);
		this.dispatch(ApplicationActions.selectOperationsTo(val));
	}
	typeChange(eventKey, event) {
		this.dispatch(ApplicationActions.selectOperationsType(eventKey));
	}
	updateScroll() {
		let node = DOMUtils.query('.table-scroller', this.rootElement);
		node.scrollTop = 0;
	}
	percent() {
		return this.isFetching ? 0 : (this.finishPercent.pop() || 0);
	}
	increment() {
		return this.autoIncrement;
	}
}