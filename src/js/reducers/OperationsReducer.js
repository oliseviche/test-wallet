import {Application, Users} from 'actions/types/Types';
import moment from 'moment';
import {WORKSPACE_CONST, TRANSACTION_TYPES} from 'utils/const';

let current = moment();

const operationsState = {
	operations: [],
	from: moment(current).startOf('day').subtract(1, 'months'),
	to: moment(current).endOf('day'),
	fetching: false,
	type: 'internal'
};

export default function(state = operationsState, action) {
	switch(action.type) {
		case Application.REQUEST_OPERATIONS_INFO:
			return {
				...state,
				fetching: true
			};
		case Application.RECIEVE_OPERATIONS_INFO_SUCCESS:
			return {
				...state,
				operations: action.operations,
				fetching: false
			};
		case Application.RECIEVE_OPERATIONS_INFO_FAILED:
			return {
				...state,
				fetching: false
			};
		case Application.DATE_FROM_SELECTED:
			return {
				...state,
				from: action.date
			};
		case Application.DATE_TO_SELECTED:
			return {
				...state,
				to: action.date
			};
		case Application.TYPE_SELECTED:
			return {
				...state,
				type: action.operation
			}
		default:
			return state;
	}
}