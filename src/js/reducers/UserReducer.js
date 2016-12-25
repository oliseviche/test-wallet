import {Application, Users} from 'actions/types/Types';

const userState = {
	ID: null,
	user: null,
	fetching: false,
};

export default function(state = userState, action) {
	switch(action.type) {
		case Application.REQUEST_INITIALIZATION_INFO:
			return {
				...state,
				fetching: true
			};
		case Application.REQUEST_INITIALIZATION_INFO_SUCCESS:
			return {
				...state,
				ID: action.data.ID,
				user: action.data.user,
				fetching: false
			};
		case Application.REQUEST_INITIALIZATION_INFO_FAILED:
			return {
				...state,
				ID: null,
				user: null,
				fetching: false
			};
		case Application.REQUEST_UPDATE_USER:
		case Application.REQUEST_UPDATE_BALANCE:
			return {
				...state,
				fetching: true
			};
		case Application.RECIEVE_UPDATE_USER_SUCCESS:
		case Application.RECIEVE_UPDATE_BALANCE_SUCCESS:
			return {
				...state,
				fetching: false,
				user: {
					...state.user,
					...action.user
				}
			};
		case Application.RECIEVE_UPDATE_USER_FAILED:
		case Application.RECIEVE_UPDATE_BALANCE_FAILED:
			return {
				...state,
				fetching: false
			};
		case Application.REQUEST_USER_INFO:
			return {
				...state,
				ID: action.id,
				fetching: true
			};
		case Application.RECIEVE_USER_INFO_SUCCESS:
			return {
				...state,
				user: action.user,
				fetching: false
			};
		case Application.RECIEVE_USER_INFO_FAILED: 
			return {
				...state,
				fetching: false
			};
		default:
			return state;
	}
}