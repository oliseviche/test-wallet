import {Application, Users} from 'actions/types/Types';
import * as ApplicationActions from 'actions/Application';
import WebService from 'services/WebService';
import * as Utils from 'utils/utils';

const webService = WebService();

export function selectUser(id) {
	return {
		type: Users.USER_SELECTED,
		id
	};
}