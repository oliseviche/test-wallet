import ComponentController from 'controllers/ComponentController';
import * as ApplicationActions from 'actions/Application';

export default class ErrorsStackController extends ComponentController {
	constructor(store) {
		super(store);
		this.closeErrorHandler = this.closeError.bind(this);
	}
	closeError(id) {
		this.dispatch(ApplicationActions.closeError(id));
	}
}