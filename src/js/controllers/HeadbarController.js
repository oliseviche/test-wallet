import ComponentController from 'controllers/ComponentController';
import * as ApplicationActions from 'actions/Application';

export default class HeadbarController extends ComponentController {
	constructor(application) {
		super(application)
	}
	showCreateUserModal() {
		this.dispatch(ApplicationActions.openModal('CREATE_USER'));
	}
}