import ComponentController from 'controllers/ComponentController';
import * as FilterActions from 'actions/Filter';
import * as ApplicationActions from 'actions/Application';
import * as Utils from 'utils/utils';
import * as DOMUtils from 'utils/dom';

export default class FilterController extends ComponentController {
	constructor(store) {
		super(store);

		this.toggleHandler = this.toggle.bind(this);
		this.typeChangeHandler = this.typeChange.bind(this);
		this.filterChangeHandler = this.filterChange.bind(this);
		this.filterUsersDebounced = Utils.debounce(this.filterUsers.bind(this));
	}
	filterChange(value) {
		this.store.dispatch(FilterActions.changeFilter(value));
		this.filterUsersDebounced();
	}
	toggle() {
		let {dropdown} = this.state.filter;

		if (!dropdown) {
			DOMUtils.subscribeOnce(document, 'click', (evt) => {
				evt.preventDefault();
				this.toggle();
			});
			this.store.dispatch(FilterActions.openDropdown());
		} else {
			this.store.dispatch(FilterActions.closeDropdown());
		}
	}
	filterUsers() {
		this.store.dispatch(FilterActions.filterStarted());
		this.store.dispatch(ApplicationActions.fetchUsers());
	}
	typeChange(type) {
		if (type === "#") {
			console.warn(`Расчитывал на поиск по ID по документашке https://developers.xsolla.com/api.html#list-all-users. Но тестовая схема мне не позволила. :(`);
		}
		this.store.dispatch(FilterActions.changeType(type));
	}

}