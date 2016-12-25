import ComponentController from 'controllers/ComponentController';
import ModalService from 'services/ModalService';
import * as ApplicationActions from 'actions/Application';
import Events from 'services/Events';
import {EventTypes} from 'utils/const';

export default class ModalWrapperController extends ComponentController {
	constructor(store) {
		super(store);
		this.id = null;
	}
	invalidateModal() {
		let {id, options} = this.state.modals;

		if (this.id !== id) {
			this.id = id;
			if (this.id) {
				let scopedId = this.id;
				ModalService.open(this.id, options).then(action => {
					this.dispatch(ApplicationActions.closeModal());
					if (action) {
						this.dispatch(action()).then(() => {
							Events.publish(EventTypes.modalSubmitted, scopedId);
						}, () => {});
					}
				});
			}
		}
	}
}