import Events from 'services/Events';

export default class ComponentController {
	constructor(store) {
		this.rootElement = null;
		this.store = store;
		this.unsubscribes = {};
	}
	get state() {
		return this.store.getState();
	}
	dispatch(action) {
		return this.store.dispatch(action);
	}
	componentMounted(rootElement) {
		this.rootElement = rootElement;
	}
	componentWillUnmount() {
		this.rootElement = null
		Object.keys(this.unsubscribes).forEach((key) => {
			this.unsubscribe(key);
		});
		this.unsubscribes = {};
	}
	subscribe(event, handler) {
		if (!this.unsubscribes[event]) {
			this.unsubscribes[event] = [];
		};
		this.unsubscribes[event].push(Events.subscribe(event, handler));
	}
	unsubscribe(event) {
		if (this.unsubscribes[event]) {
			this.unsubscribes[event].forEach(listener => {
				listener.remove();
			});
			this.unsubscribes[event] = [];
		}
	}
}