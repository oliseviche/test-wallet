import ComponentController from 'controllers/ComponentController';
import * as Actions from 'actions/search/ActionsCreator';
import * as PaginatorActions from 'actions/paginator/ActionCreators';
import * as Utils from 'utils/utils';
import * as DOMUtils from 'utils/dom';

const MAP = { '@': 'email', '#': 'user_id' };

export default class SearchController extends ComponentController {
	constructor(store) {
		super(store);

		this.input = null;
		this.removeInputChanged = DOMUtils.empty;
	}
	componentMounted(rootElement) {
		super.componentMounted(rootElement);

		this.input = DOMUtils.query('.form-control');
		this.removeInputChanged = DOMUtils.subscribe(this.input, 'input', Utils.debounce(this.filterChangedHandler.bind(this)))
	}
	componentWillUnmount(rootElement) {
		this.removeInputChanged();
	}
	filterChangedHandler() {
		let filterParams = null;
		let value = this.input.value.trim();

		if (value.length && MAP[this.state.search.searchBy]) {
			filterParams = {[MAP[this.state.search.searchBy]] : value };
		}

		this.application.fetchUsers(filterParams).then(() => {
			this.defaultPaginatorSettings();
		});
	}
	toggleDropdown() {
		let isActive = this.state.search.dropdownActive;

		if (!isActive) {
			DOMUtils.subscribeOnce(document, 'click', (evt) => {
				evt.preventDefault();
				this.toggleDropdown();
			});
			this.store.dispatch(Actions.setDropdownActiveState(true));
		} else {
			this.store.dispatch(Actions.setDropdownActiveState(false));
		}
	}
	setSearchBy(type) {
		if (type === "#") {
			alert(`Расчитывал на поиск по ID по документашке https://developers.xsolla.com/api.html#list-all-users. 
					Но тестовая схема мне не позволила. :(`);
		}
		this.store.dispatch(Actions.setSearchBy(type));
	}
	defaultPaginatorSettings() {
		this.store.dispatch(PaginatorActions.reset(0));
	}
}