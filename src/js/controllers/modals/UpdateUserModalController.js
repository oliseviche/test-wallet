import { BaseDialogController } from 'services/ModalService';
import * as ApplicationActions from 'actions/Application';
import * as DOMUtils from 'utils/dom';
import * as Utils from 'utils/utils';

export default class UpdateUserModalController extends BaseDialogController {
	constructor(modal) {
		super(modal);
		this.submitHandler = this.submit.bind(this);
		this.cancelHandler = this.cancel.bind(this);
	}
	init(rootElement) {
		this.rootElement = rootElement;
	}
	open() {
		DOMUtils.query('[name]', this.rootElement).focus();
	}
	submit() {
		let fields = DOMUtils.collectFields(this.rootElement);
		this.modal.submit(() => ApplicationActions.updateUser(Utils.fields2json(fields)));
	}
	cancel() {
		this.modal.cancel();
	}
}