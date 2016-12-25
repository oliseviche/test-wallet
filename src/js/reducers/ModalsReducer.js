import {Application} from 'actions/types/Types';

const ModalsState = {
	id: null,
	options: null
};

export default function(state = ModalsState, action) {
	switch(action.type) {
		case Application.MODAL_OPENED:
			return {
				...state,
				id: action.id,
				options: action.options
			};
		case Application.MODAL_CLOSED:
			return {
				...state,
				id: null,
				options: null
			};
		default:
			return state;
	}
}