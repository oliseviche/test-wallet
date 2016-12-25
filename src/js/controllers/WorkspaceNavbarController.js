import ComponentController from 'controllers/ComponentController';
import * as ApplicationActions from 'actions/Application';
import {WORKSPACE_CONST} from 'utils/const';

export default class WorkspaceNavbarController extends ComponentController {
	constructor(store) {
		super(store);
		this.selectDetailsHandler = this.selectDetails.bind(this);
		this.selectOperationsHandler = this.selectOperations.bind(this);
		this.selectedTab = this.state.workspace.tab;
	}
	invalidateNavigator() {
		if (this.selectedTab !== this.state.workspace.tab) {
			this.selectedTab = this.state.workspace.tab;
			switch(this.selectedTab) {
				case WORKSPACE_CONST.OPERATIONS:
					return this.dispatch(ApplicationActions.requestOperationsInfo());
				default:
					return this.dispatch(ApplicationActions.requestUserInfo());
			}
			return true;
		}
		return false;
	}
	selectDetails() {
		this.dispatch(ApplicationActions.selectDetails());
	}
	selectOperations() {
		this.dispatch(ApplicationActions.selectOperations());
	}
}