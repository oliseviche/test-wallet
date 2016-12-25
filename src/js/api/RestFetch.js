import _ from 'lodash';

function buildQuery(params) {
	let queryParams = Object.keys(params).map(key => {
		return `${key}=${params[key]}`;
	});
	return queryParams.length ? `?${queryParams.join('&')}` : '';
}

export default function fetchRunner(url, method, params, options) {
	let endpoint = url;

	if (params) {
		endpoint += buildQuery(params);
	}

	let init = _.extend({}, options, {
		method: method
	});

	return fetch(endpoint, init);
}