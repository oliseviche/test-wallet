import {Application, Users} from 'actions/types/Types';
import {PAGE_SIZE} from 'utils/const';

function sortById(a, b) {
	let id1 = a.id.toLowerCase();
	let id2 = b.id.toLowerCase();
	return id1 < id2 ? -1 : id1 > id2 ? 1 : 0;
}

function mergeUsers(users, newUsers, user) {
	let data = {
		users: [...users, user].sort(sortById),
		newUsers: [user, ...newUsers].slice(0, 4)
	};

	if (data.users.slice(1, -1).indexOf(user) < 0) {
		data.users = users;
		data.newUsersVisible = true;
	} else {
		data.users = data.users.slice(0, -1);
	}

	return data;
}

const usersState = {
	users: [],
	newUsers: [],
	selectedID: null,
	fetching: false,
	creating: false,
};

export default function(state = usersState, action) {
	switch(action.type) {
		case Application.REQUEST_USERS_DATA:
		case Application.REQUEST_INITIALIZATION_INFO:
			return {
				...state,
				fetching: true
			};
		case Application.RECIEVE_USERS_DATA_SUCCESS:
			return {
				...state,
				users: action.users,
				fetching: false
			};
		case Application.REQUEST_INITIALIZATION_INFO_SUCCESS:
			return {
				...state,
				users: action.data.users,
				selectedID: action.data.ID,
				fetching: false
			};
		case Application.RECIEVE_USERS_DATA_FAILED:
		case Application.REQUEST_INITIALIZATION_INFO_FAILED:
			return {
				...state,
				users: [],
				fetching: false
			};
		case Users.USER_SELECTED:
			return {
				...state,
				selectedID: action.id
			};
		case Application.REQUEST_CREATE_USER:
			return {
				...state,
				creating: true
			};
		case Application.RECIEVE_CREATE_USER_SUCCESS:
			return {
				...state,
				...mergeUsers(state.users, state.newUsers, action.user),
				creating: false
			};
		case Application.RECIEVE_CREATE_USER_FAILED:
			return {
				...state,
				creating: false
			};
		case Application.RECIEVE_UPDATE_USER_SUCCESS:
			return {
				...state,
				users: [
					...state.users.map((user) => user.id !== action.user.id ? 
						user : 
						{ id: action.user.id, name: action.user.name, email: action.user.email, enabled: action.user.enabled })
				],
				newUsers: [
					...state.newUsers.map((user) => user.id !== action.user.id ?
						user :
						{ id: action.user.id, name: action.user.name, email: action.user.email, enabled: action.user.enabled })
				]
			};
		case Application.NEW_USERS_CLEARED:
			return {
				...state,
				newUsers: []
			}
		default:
			return state;
	}
}