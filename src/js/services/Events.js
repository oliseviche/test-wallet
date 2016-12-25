export default (function () {
	let events = {};

	return {
		subscribe: function (event, listener) {
			if (!events[event]) {
				events[event] = {
					queue: []
				};
			}
			let index = events[event].queue.push(listener) - 1;
			return {
				remove: function () {
					delete events[event].queue[index];
				}
			};
		},
		publish: function (event, info) {
			if (!events[event] || !events[event].queue.length) {
				return;
			}

			let items = events[event].queue;
			items.forEach(function (item) {
				item(info || {});
			});
		}
	};
})();