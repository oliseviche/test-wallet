import {Paginator} from 'actions/types/Types';

export function selectPage(index) {
	return {
		type: Paginator.PAGE_SELECTED,
		index
	};
}

export function skipPages(skip) {
	return {
		type: Paginator.PAGE_SKIPPED,
		skip
	};
}