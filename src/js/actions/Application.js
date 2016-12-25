import {Application, Filter, Users} from 'actions/types/Types';
import WebService from 'services/WebService';
import { PAGE_SIZE } from 'utils/const.js';
import * as Utils from 'utils/utils';
import moment from 'moment';

const webService = WebService();

export function initApplication() {
	return function(dispatch, getState) {
		dispatch({
			type: Application.REQUEST_INITIALIZATION_INFO
		});

		let result = {
			users: [],
			recordsTotal: 0,
			ID: 0,
			user: null
		};
		
		return webService.users.all(0, PAGE_SIZE).then(data => {
			result.users = data.data.map(user => ({ id: user.user_id, name: user.user_name, email: user.email, enabled: user.enabled }));
			result.recordsTotal = data.recordsTotal;
			result.ID = result.users[0].id;
			return webService.users.user(result.ID);
		}).then(user => {
			result.user = { 
				id: user.user_id, 
				name: user.user_name, 
				custom: user.user_custom,
				email: user.email, 
				balance: user.balance,
				amount: user.amount,
				currency: user.currency,
				enabled: user.enabled,
				register_date: user.register_date
			};
			dispatch({
				type: Application.REQUEST_INITIALIZATION_INFO_SUCCESS,
				data: result
			});
		}).catch((ex) => {
			Utils.logError(ex);
			dispatch({
				type: Application.REQUEST_INITIALIZATION_INFO_FAILED,
				exception: ex
			});
		});
	};
} 

export function fetchUsers() {
	return function(dispatch, getState) {
		dispatch({
			type: Application.REQUEST_USERS_DATA
		});
		let { selected } = getState().paginator;
		let { type, value, filtering } = getState().filter;
		let searchParams = filtering ? {
			[{'@':'email', '#':'user_id'}[type]]: value
		} : {};
		let from = filtering ? 0 : selected;
		let result = webService.users.all(from * PAGE_SIZE, PAGE_SIZE, searchParams);

		result.then(data => {
			let users = data.data.map(user => ({ id: user.user_id, name: user.user_name, email: user.email, enabled: user.enabled }));
			let recordsTotal = data.recordsTotal;		
			dispatch({
				type: Application.RECIEVE_USERS_DATA_SUCCESS,
				users,
				recordsTotal
			});
		}).catch((ex) => {
			dispatch({
				type: Application.RECIEVE_USERS_DATA_FAILED,
				exception: ex
			});
		});

		if(filtering) {
			result.then(() => {
				dispatch({
					type: Filter.FILTER_ENDED
				});
			});
		}

		return result;
	};
}

export function openModal(id, options = null) {
	return {
		type: Application.MODAL_OPENED,
		id,
		options
	};
}

export function closeModal() {
	return {
		type: Application.MODAL_CLOSED
	};
}

export function selectDetails() {
	return {
		type: Application.DETAILS_SELECTED
	};
}

export function selectOperations() {
	return {
		type: Application.OPERATIONS_SELECTED
	}
}

export function createUser(fields) {
	return function(dispatch, getState) {
		dispatch({
			type: Application.REQUEST_CREATE_USER
		});

		let result = webService.users.create(fields);

		result.then(data => {
			let user = { id: fields.user_id, name: fields.user_name, email: fields.email, enabled: true };

			dispatch({
				type: Application.RECIEVE_CREATE_USER_SUCCESS,
				user
			});
		}, (ex) => {
			dispatch({
				type: Application.RECIEVE_CREATE_USER_FAILED,
				exception: ex
			});
		});

		return result;
	};
}

export function updateUser(fields) {
	return function(dispatch, getState) {
		dispatch({
			type: Application.REQUEST_UPDATE_USER
		});

		let { ID, user } = getState().user;
		let result = webService.users.update(ID, fields);

		result.then(() => {
			let merged = {
				...user,
				name: fields.user_name, 
				custom: fields.user_custom,
				email: fields.email, 
				enabled: fields.enabled
			};
			dispatch({
				type: Application.RECIEVE_UPDATE_USER_SUCCESS,
				user: merged
			});
		}).catch((ex) => {
			Utils.logError(ex);
			dispatch({
				type: Application.RECIEVE_UPDATE_USER_FAILED,
				exception: ex
			});
		});

		return result;
	};
}

export function updateBalance(fields) {
	return function(dispatch, getState) {
		dispatch({
			type: Application.REQUEST_UPDATE_BALANCE
		});

		let { ID, user } = getState().user;
		let result = webService.users.balance(ID, fields);

		result.then((result) => {
			let merged = {
				...user,
				balance: result.amount
			};
			dispatch({
				type: Application.RECIEVE_UPDATE_BALANCE_SUCCESS,
				user: merged
			});
		}).catch((ex) => {
			Utils.logError(ex);
			dispatch({
				type: Application.RECIEVE_UPDATE_BALANCE_FAILED,
				exception: ex
			});
		});

		return result;
	};
}

export function requestUserInfo() {
	return function(dispatch, getState) {
		let {selectedID} = getState().users;

		dispatch({
			type: Application.REQUEST_USER_INFO,
			id: selectedID
		});

		return webService.users.user(selectedID)
		.then((result) => {
			let user = { 
				id: result.user_id, 
				name: result.user_name, 
				custom: result.user_custom,
				email: result.email, 
				balance: result.balance,
				amount: result.wallet_amount,
				currency: result.wallet_currency,
				enabled: result.enabled,
				register_date: result.register_date
			};
			dispatch({
				type: Application.RECIEVE_USER_INFO_SUCCESS,
				user
			});
		})
		.catch((ex) => {
			Utils.logError(ex);

			dispatch({
				type: Application.RECIEVE_USER_INFO_FAILED,
				exception: ex
			});
		});
	}
}

export function requestOperationsInfo() {
	return function(dispatch, getState) {
		let {selectedID} = getState().users;
		let {from, to, type} = getState().operations;

		dispatch({
			type: Application.REQUEST_OPERATIONS_INFO,
			id: selectedID
		});

		let utcFrom = moment(from).format("YYYY-MM-DDTHH:mm:ss[Z]");
		let utcTo = moment(to).endOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');

		return webService.users.transactions(selectedID, utcFrom, utcTo, type)
		.then((operations) => {
			dispatch({
				type: Application.RECIEVE_OPERATIONS_INFO_SUCCESS,
				operations
			});
		})
		.catch((ex) => {
			Utils.logError(ex);
			dispatch({
				type: Application.RECIEVE_OPERATIONS_INFO_FAILED,
				exception: ex
			});
		});
	}
}

export function selectOperationsFrom(date) {
	return {
		type: Application.DATE_FROM_SELECTED,
		date
	};
}

export function selectOperationsTo(date) {
	return {
		type: Application.DATE_TO_SELECTED,
		date
	};
}

export function selectOperationsType(operation) {
	return {
		type: Application.TYPE_SELECTED,
		operation
	};
}

export function newUserListClear() {
	return {
		type: Application.NEW_USERS_CLEARED
	};
}

export function closeError(id) {
	return {
		type: Application.ERROR_CLOSED,
		id
	};
}