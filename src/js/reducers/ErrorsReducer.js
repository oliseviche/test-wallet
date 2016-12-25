import {Application, Users} from 'actions/types/Types';

let ERROR_COUNTER = 0;

const ErrorsState = {
	errors: []
};

export default function(state = ErrorsState, action) {
	switch(action.type) {
		case Application.REQUEST_INITIALIZATION_INFO_FAILED:
		case Application.RECIEVE_USERS_DATA_FAILED:
		case Application.RECIEVE_CREATE_USER_FAILED:
		case Application.REQUEST_USER_INFO_FAILED:
		case Application.RECIEVE_UPDATE_USER_FAILED:
		case Application.RECIEVE_UPDATE_BALANCE_FAILED:
		case Application.RECIEVE_OPERATIONS_INFO_FAILED:
			return {
				...state,
				errors: [
					...state.errors,
					{
						exception: action.exception,
						id: ++ERROR_COUNTER
					}
				]
			};
		case Application.ERROR_CLOSED:
			return {
				...state,
				errors: state.errors.filter(e => e.id !== action.id)
			};
		default:
			return state;
	}
}