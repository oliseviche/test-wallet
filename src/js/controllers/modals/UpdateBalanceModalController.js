import { BaseDialogController } from 'services/ModalService';
import * as ApplicationActions from 'actions/Application';
import * as DOMUtils from 'utils/dom';
import * as Utils from 'utils/utils';

export default class UpdateBalanceModalController extends BaseDialogController {
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
		if (this.validateFields(fields)) {
			this.modal.submit(() => ApplicationActions.updateBalance(Utils.fields2json(fields)));
		}
	}
	cancel() {
		this.modal.cancel();
	}
	validateFields(fields) {
		let field = fields['comment'];
		if (field && field.value.trim().length) {
			field.node.parentNode.classList.remove('has-error');
			return true;
		} else {
			field.node.parentNode.classList.add('has-error');
		}
	}
}