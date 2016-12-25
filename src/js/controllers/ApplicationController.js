import ComponentController from 'controllers/ComponentController';
import * as ApplicationActions from 'actions/Application';
import WebService from 'services/WebService';

const webService = WebService();

export default class ApplicationController extends ComponentController {
	fetchUsers() {
		this.dispatch(ApplicationActions.initApplication());
	}
}