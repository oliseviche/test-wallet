import * as UsersActions from 'actions/Users';
import * as ApplicationActions from 'actions/Application';
import ComponentController from 'controllers/ComponentController';
import Events from 'services/Events';
import {EventTypes} from 'utils/const';
import {WORKSPACE_CONST} from 'utils/const';

export default class UsersListController extends ComponentController {
	constructor(store) {
		super(store);
		this.selectUserHandler = this.selectUser.bind(this);
		this.subscribe(EventTypes.pageChanged, this.updateScroll.bind(this));
		this.autoIncrement = false;
		this.isFetching = false;
		this.finishPercent = [];
	}
	componentMounted(rootElement) {
		super.componentMounted(rootElement);
	}
	componentWillUnmount(rootElement) {
		super.componentWillUnmount();
	}
	updateScroll() {
		this.rootElement.scrollTop = 0;
	}
	selectUser(id) {
		this.dispatch(UsersActions.selectUser(id));
		let {tab} = this.state.workspace;

		if (tab === WORKSPACE_CONST.DETAILS) {
			this.dispatch(ApplicationActions.requestUserInfo());
		} else {
			this.dispatch(ApplicationActions.requestOperationsInfo()).then(() => {
				Events.publish(EventTypes.userChanged);
			});
		}
	}
	invalidate() {
		let {fetching} = this.state.users;

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