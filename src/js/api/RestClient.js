function crudify(handler) {
	Object.defineProperties(handler, {
		get: {
			get: function() {
				return function(params, options) {
					return restRunner(this.route, 'GET', params, options);
				};
			}
		},
		post: {
			get: function() {
				return function(params, options) {
					return restRunner(this.route, 'POST', params, options);
				};
			}
		},
		put: {
			get: function() {
				return function(params, options) {
					return restRunner(this.route, 'PUT', params, options);
				};
			}
		},
		delete: {
			get: function() {
				return function(params, options) {
					return restRunner(this.route, 'DELETE', params, options);
				};
			}
		}
	})

	return handler;
}

function defineHandler(route) {
	let value;
	let handler;
	
	handler = function(param) {
		if (arguments.length) {
			value = param;
		}
		return handler;
	};

	Object.defineProperty(handler, 'route', {
		get: function() {
			let routeParts = [route];
			if (value != undefined) {
				routeParts.push(value);
			}
			return concatRoutes.apply(null, routeParts); 
		}
	});
	
	return crudify(handler);
}

function camelCaseify(input) {
	return input.replace(/-./gi, value => value.substring(1).toUpperCase());
}

function concatRoutes() {
	let routes = Array.prototype.slice.call(arguments);
	return routes.filter(route => route.length).join('/');
}

function createResource(resource, baseRoute = '') {
	let handler = defineHandler(concatRoutes(baseRoute, resource.route));

	if (resource.resources) {
		(Array.isArray(resource.resources) ? resource.resources : [resource.resources]).forEach(resource => {
			Object.defineProperty(handler, camelCaseify(resource.route), {
				get: function() {
					return createResource(resource, this.route);
				}
			});
		});
	}

	return handler;
}

let restRunner = null;

export default function(config, runner) {
	restRunner = runner;
	return createResource(config);
};