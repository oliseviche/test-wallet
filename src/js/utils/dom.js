function closestPolyfill(css) { 
	let node = this;
	let matchesSelector = node.matches || node.msMatchesSelector;
	while (node) {
		if (matchesSelector.call(node, css)) {
			return node;
		} 
		else {
			node = node.parentElement;
		}
	}
	return null;
}

export function query(selector, element) {
	return (element || document).querySelector(selector);
}

export function queryAll(selector, element) {
	return (element || document).querySelectorAll(selector);
}

export function subscribe(element, event, handler) {
	element.addEventListener(event, handler, false);
	return () => {
		element.removeEventListener(event, handler, false);
		return emptyHandler;
	}
}

export function subscribeOnce(element, event, handler) {
	let unsubscribe = subscribe(element, event, (evt) => {
		handler(evt);
		unsubscribe();
	});
	return unsubscribe;
}

export function emptyHandler() {
}

export function closest(e, selector) {
	let closest = e.closest || closestPolyfill;
	return closest.apply(e, [selector]);
}

export function collectFields(parent) {
	let fields = {};

	[...queryAll('[name]', parent)]
	.reduce((prev, next) => {
		prev[next.name.replace(/^input-/gi, '')] = {
			value: next.value,
			node: next
		};
		return prev;
	}, fields);
	[...queryAll('[type="checkbox"][name]')]
	.reduce((prev, next) => {
		prev[next.name.replace(/^input-/gi, '')] = {
			value: next.checked === true,
			node: next
		};
	}, fields);

	return fields;
}