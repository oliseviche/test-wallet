const pipeline = (...funcs) => {
	return function() {
		let that = this;
		return funcs.reduce((a, b) => b.call(that, ...(a||{})), arguments);
	};
};

const dummy = function dummy() { return arguments; };

export function extend(definition, ...extenders) {
	(extenders || []).forEach(extender => {
		extender(definition);
	})
	return definition;
}

export function controllerExtender(definition) {
	definition.controller = function () {
		return this.props.controller;	
	}
}

export function reduxExtender(definition) {
	definition.redux = function() {
		let store = this.props.controller.store;
		return {
			get store() {
				return store;
			},
			get state() {
				return store.getState();
			},
			get dispatch() {
				return store.dispatch;
			}
		};
	};
}

export function observerExtender(definition) {
	if ('function' !== typeof definition.observe) {
		console.warn('observerExtender requires \'observe\' method in definition object');
		return definition;
	}

	let unsubscribe = null;

	definition.componentDidMount = pipeline(
		definition.componentDidMount || dummy,
		function() {
			if (this.redux && this.observe) {
				unsubscribe = this.redux().store.subscribe(() => {
					if (unsubscribe) {
						this.observe(...arguments);
					}
				});
			}
			return arguments;
		}
	);

	definition.componentWillUnmount = pipeline(
		definition.componentWillUnmount || dummy,
		function() {
			if (unsubscribe) {
				unsubscribe = unsubscribe();
			}
			return arguments;
		},
	);
}