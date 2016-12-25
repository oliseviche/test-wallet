import usersReducer from 'reducers/UsersReducer';
import paginatorReducer from 'reducers/PaginatorReducer';
import filterReducer from 'reducers/FilterReducer';
import errorsReducer from 'reducers/ErrorsReducer';
import modalsReducer from 'reducers/ModalsReducer';
import userReducer from 'reducers/UserReducer';
import workspaceReducer from 'reducers/WorkspaceReducer';
import operationsReducer from 'reducers/OperationsReducer';

export default function(state = {}, action) {
	return {
		users: usersReducer(state.users, action),
		user: userReducer(state.user, action),
		paginator: paginatorReducer(state.paginator, action),
		filter: filterReducer(state.filter, action),
		errors: errorsReducer(state.errors, action),
		modals: modalsReducer(state.modals, action),
		workspace: workspaceReducer(state.workspace, action),
		operations: operationsReducer(state.operations, action)
	};
}