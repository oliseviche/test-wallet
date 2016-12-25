import {Filter} from 'actions/types/Types';

const FilterState = {
	type: '@',
	value: '',
	dropdown: false,
	filtering: false
};

export default function(state = FilterState, action) {
	switch(action.type) {
		case Filter.DROPDOWN_OPENED:
			return {
				...state,
				dropdown: true
			};
		case Filter.DROPDOWN_CLOSED:
			return {
				...state,
				dropdown: false
			};
		case Filter.TYPE_CHANGED:
			return {
				...state,
				type: action.value
			};
		case Filter.FILTER_CHANGED: 
			return {
				...state,
				value: action.value
			};
		case Filter.FILTER_STARTED:
			return {
				...state,
				filtering: true
			};
		case Filter.FILTER_ENDED:
			return {
				...state,
				filtering: false
			};
		default:
			return state;
	}
}