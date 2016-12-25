import * as TYPES from 'actions/Types';

let defaultState = {
	searchBy: '@',
	dropdownActive: false
};

export default function(state = defaultState, action) {
	switch(action.type) {
		case TYPES.SET_SEARCH_DROPDOWN_ACTIVE:
			return {
				...state,
				dropdownActive: action.isActive
			};
		case TYPES.SET_SEARCH_BY:
			return {
				...state,
				searchBy: action.searchBy
			}
		default:
			return state;
	}
}