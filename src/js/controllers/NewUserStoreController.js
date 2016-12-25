import * as UsersActions from 'actions/Users';
import * as ApplicationActions from 'actions/Application';
import ComponentController from 'controllers/ComponentController';
import Events from 'services/Events';
import {EventTypes} from 'utils/const';
import {WORKSPACE_CONST} from 'utils/const';
import * as DOMUtils from 'utils/dom';

const ANIMATION_LENGTH = 300;
const SCROLL_BY = 53 / ANIMATION_LENGTH;

function animate(e, length) {
	let step = function() {
		let diff = Date.now() - start;
		e.scrollTop = (scroll += diff * SCROLL_BY);

		if ((passed += diff) < length) {
			start = Date.now();
			handle = requestAnimationFrame(step);
		}
	}
	let handle;
	let scroll = 0;
	let passed = 0;
	let start = Date.now();
	handle = requestAnimationFrame(step);

	return {
		stop() {
			cancelAnimationFrame(handle);
		}
	}
}

export default class UsersListController extends ComponentController {
	constructor(store) {
		super(store);
		this.selectUserHandler = this.selectUser.bind(this);
		this.clearListHandler = this.clearList.bind(this);
		this.subscribe(EventTypes.modalSubmitted, this.scroll.bind(this));
		this.animationSequence = null;
	}
	componentMounted(rootElement) {
		super.componentMounted(rootElement);
	}
	componentWillUnmount(rootElement) {
		super.componentWillUnmount();
		if (this.animationSequence) {
			this.animationSequence.stop();
		}
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
	scroll(id) {
		if (id === 'CREATE_USER') {
			let e = DOMUtils.query('.users-created ul', this.rootElement);
			if (e) {
				this.animationSequence = animate(e, ANIMATION_LENGTH);
			}
		}
	}
	clearList() {
		this.dispatch(ApplicationActions.newUserListClear());
	}
}