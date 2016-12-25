import ComponentController from 'controllers/ComponentController';
import * as ApplicationActions from 'actions/Application';
import {EventTypes} from 'utils/const';
import * as DOMUtils from 'utils/dom';

export default class UserInfoController extends ComponentController {
	constructor(store) {
		super(store);
		this.subscribe(EventTypes.modalSubmitted, this.scroll.bind(this));
		this.autoIncrement = false;
		this.isFetching = false;
		this.finishPercent = [];
	}
	openUpdateUserModal() {
		let { user } = this.state.user;
		this.dispatch(ApplicationActions.openModal('UPDATE_USER', user));
	}
	openUpdateBalanceModal() {
		let { user } = this.state.user;
		this.dispatch(ApplicationActions.openModal('UPDATE_BALANCE', user));
	}
	scroll(id) {
		let e = DOMUtils.query(`#${id.toLowerCase()}`, this.rootElement);
		if(e) {
			e.click();
		}
	}
	invalidate() {
		let {fetching} = this.state.user;

		if (fetching !== this.isFetching) {
			if (!fetching) {
				this.finishPercent.unshift(100);
			}
			this.autoIncrement = !this.autoIncrement;
			this.isFetching = fetching;
		}
	}
	percent() {
		return this.isFetching ? 0 : (this.finishPercent.pop() || 0);
	}
	increment() {
		return this.autoIncrement;
	}
}