import ComponentController from 'controllers/ComponentController';
import * as PaginatorActions from 'actions/Paginator';
import * as ApplicationActions from 'actions/Application';
import Events from 'services/Events';
import {EventTypes} from 'utils/const';

export default class PaginatorController extends ComponentController {
	constructor(store) {
		super(store)
		this.forwardHandler = this.skip.bind(this);
		this.backwardHandler = this.skip.bind(this);
		this.selectHandler = this.select.bind(this);
	}
	select(index) {
		this.store.dispatch(PaginatorActions.selectPage(index));
		this.store.dispatch(ApplicationActions.fetchUsers()).then(() => {
			Events.publish(EventTypes.pageChanged);
		});
	}
	skip(skip) {
		this.store.dispatch(PaginatorActions.skipPages(skip));
	}
}