import restClient from 'api/RestClient';
import restConfig from 'api/RestConfig';
import restRunner from 'api/RestFetch';

const PROJECT_ID = 'baev';

let allUsersRequestId = 0;

function checkStatusCode(result) {
	// O'RLY?
	if (result.http_status_code) {
		//What we have got here...
		if (result.http_status_code < 200 || 299 < result.http_status_code) {
			throw result;
		}
	}
}

class UsersApi {
	constructor(client) {
		this.client = client;
		this.user = this.wrapTransacted(this.user);
		this.all = this.wrapTransacted(this.all);
		this.transactions = this.wrapTransacted(this.transactions);
	}
	wrapTransacted(method) {
		let transaction = {
			id: 0,
			equals(id) {
				return this.id === id;
			}
		};
		return function() {
			++transaction.id;
			return method.apply(this, [transaction, ...arguments]);
		}
	}
	all(transaction, from, limit, filter) {
		let params = {
			offset: from,
			limit: limit,
			...filter
		};
		let local = transaction.id;
		return new Promise((resolve, reject) => {
			this.client.users.get(params).then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new TypeError('Cannot fetch all users');
				}
			}).then(result => {
				checkStatusCode(result);
				if (transaction.equals(local)) {
					resolve(result);
				}
			}).catch(ex => {
				if (transaction.equals(local)) {
					reject(ex);
				}
			});
		});
	}
	user(transaction, id) {
		let local = transaction.id;
		return new Promise((resolve, reject) => {
			this.client.users(id).get().then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new TypeError('Cannot fetch user');
				}
			}).then(result => {
				if (transaction.equals(local)) {
					resolve(result);
				}
			}).catch(ex => {
				if (transaction.equals(local)) {
					reject(ex);
				}
			});
		});
	}
	create(fields) {
		let body = JSON.stringify({
			...fields,
			project_id: PROJECT_ID
		});

		return new Promise((resolve, reject) => {
			this.client.users.post(null, { body }).then((response) => {
				if (!response.ok) {
					throw new TypeError('Cannot create users');
				}
				return response.json().then((result) => {
					checkStatusCode(result);
					return fields;
				}, () => {
					return fields;
				});
			}).then(result => {
				resolve(result);
			}).catch(ex => {
				reject(ex);
			})
		});
	}
	update(id, fields) {
		let body = JSON.stringify({
			project_id: PROJECT_ID,
			user_id: id,
			...fields
		});
		return new Promise((resolve, reject) => {
			this.client.users(id).put(null, {
				body
			}).then((response) => {
				if (!response.ok) {
					throw new TypeError('Cannot udpate user');
				}
				resolve(fields);
			}).catch(ex => {
				reject(ex);
			});
		});
	}
	balance(id, fields) {
		let body = JSON.stringify({
			project_id: PROJECT_ID,
			user_id: id,
			...fields
		});

		return new Promise((resolve, reject) => {
			this.client.users(id).recharge.post(null, {
				body
			}).then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new TypeError('Cannot fetch all users');
				}
			}).then((result) => {
				checkStatusCode(result);
				resolve(result);
			}).catch(ex => {
				reject(ex);
			});
		});
	}
	transactions(transaction, id, from, to, type) {
		let local = transaction.id;
		let params = {
			datetime_from: from,
			datetime_to: to,
			transaction_type: type
		};
		return new Promise((resolve, reject) => {
			this.client.users(id).transactions.get(params)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new TypeError('Cannot fetch all users');
				}
			}).then((result) => {
				if (transaction.equals(local)) {
					checkStatusCode(result);
					resolve(result);
				}
			}).catch(ex => {
				if (transaction.equals(local)) {
					reject(ex);
				}
			});
		});
	}
}

class WebApiService {
	constructor(usersApi, userApi) {
		this.UsersApi = usersApi;
	}

	get users() {
		return this.UsersApi;
	}
}

let client = restClient(restConfig, restRunner).testTask(PROJECT_ID);
let service = new WebApiService(new UsersApi(client));

export default function() {
	return service;
} 