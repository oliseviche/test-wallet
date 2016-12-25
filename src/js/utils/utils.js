/*class Middleware {
	go = (next) => next()
	use(fn) {
		this.go = (stack => {
			return next => {
				return stack(() => fn.call(this, next.bind(this)));
			};
		})(this.go);
	}
}*/

export function debounce(method, ms = 300) {
	let timerId = null;

	return function() {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			method(...arguments);
		}, ms);
	};
}

/*export function middleware() {
	return new Middleware();
}*/

export function fields2json(fields) {
	return Object.keys(fields).reduce((prev, next) => {
		return prev[next] = fields[next].value, prev;
	}, {});
}

export function logError(e) {
	console.error(e);
}