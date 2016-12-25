import {Application, Paginator, Filter} from 'actions/types/Types';
import { PAGE_SIZE, MAX_VIEW_PAGES } from 'utils/const';

const paginatorState = {
	recordsTotal: 0,
	pages: 0,
	view: 0,
	skip: 0,
	selected: 0,
	canBackward: false,
	canForward: false
};

function invalidatePages(recordsTotal) {
	return Math.ceil(recordsTotal / PAGE_SIZE);
}

function invalidateView(recordsTotal) {
	return Math.min(invalidatePages(recordsTotal), MAX_VIEW_PAGES);
}

function invalidateSkip(recordsTotal, skip) {
	return Math.min(Math.max(0, skip), invalidatePages(recordsTotal) - invalidateView(recordsTotal));
}

function invalidateBackward(recordsTotal, skip) {
	return invalidatePages(recordsTotal) && invalidateSkip(recordsTotal, skip);
};

function invalidateForward(recordsTotal, skip) {
	return invalidateSkip(recordsTotal, skip) + invalidateView(recordsTotal) < invalidatePages(recordsTotal);
}

export default function(state = paginatorState, action) {
	switch(action.type) {
		case Application.REQUEST_INITIALIZATION_INFO_SUCCESS:
			return {
				...state,
				recordsTotal: action.data.recordsTotal,
				pages: invalidatePages(action.data.recordsTotal),
				view: invalidateView(action.data.recordsTotal),
				skip: invalidateSkip(action.data.recordsTotal, state.skip),
				canBackward: invalidateBackward(action.data.recordsTotal, state.skip),
				canForward: invalidateForward(action.data.recordsTotal, state.skip)
			};
		case Application.RECIEVE_USERS_DATA_SUCCESS:
			return {
				...state,
				recordsTotal: action.recordsTotal,
				pages: invalidatePages(action.recordsTotal),
				view: invalidateView(action.recordsTotal),
				skip: invalidateSkip(action.recordsTotal, state.skip),
				canBackward: invalidateBackward(action.recordsTotal, state.skip),
				canForward: invalidateForward(action.recordsTotal, state.skip)
			};
		case Application.REQUEST_INITIALIZATION_INFO_FAILED:
		case Application.RECIEVE_USERS_DATA_FAILED:
			return {
				...state,
				...paginatorState
			};
		case Paginator.PAGE_SELECTED:
			return {
				...state,
				selected: action.index
			};
		case Paginator.PAGE_SKIPPED:
			return {
				...state,
				skip: invalidateSkip(state.recordsTotal, action.skip),
				canBackward: invalidateBackward(state.recordsTotal, action.skip),
				canForward: invalidateForward(state.recordsTotal, action.skip)
			};
		case Filter.FILTER_ENDED:
			return {
				...state,
				skip: 0,
				selected: 0
			};
		case Application.RECIEVE_CREATE_USER_SUCCESS:
			let records = ++state.recordsTotal;
			return {
				...state,
				recordsTotal: records,
				pages: invalidatePages(records),
				view: invalidateView(records),
				skip: invalidateSkip(records, state.skip),
				canBackward: invalidateBackward(records, state.skip),
				canForward: invalidateForward(records, state.skip)
			};
		default:
			return state;
	}
}