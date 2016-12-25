import {Application} from 'actions/types/Types';
import {WORKSPACE_CONST} from 'utils/const';

const WorkspaceState = {
	tab: WORKSPACE_CONST.DETAILS
};

export default function(state = WorkspaceState, action) {
	switch(action.type) {
		case Application.DETAILS_SELECTED:
			return {
				...state,
				tab: WORKSPACE_CONST.DETAILS
			};
		case Application.OPERATIONS_SELECTED:
			return {
				...state,
				tab: WORKSPACE_CONST.OPERATIONS
			};
		default:
			return state;
	}
}