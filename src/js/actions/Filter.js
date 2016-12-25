import {Filter} from 'actions/types/Types';

export function openDropdown() {
	return {
		type: Filter.DROPDOWN_OPENED
	};
}

export function closeDropdown() {
	return {
		type: Filter.DROPDOWN_CLOSED
	};
}

export function changeType(type) {
	return {
		type: Filter.TYPE_CHANGED,
		value: type
	};
}

export function changeFilter(value) {
	return {
		type: Filter.FILTER_CHANGED,
		value
	};
}

export function filterStarted() {
	return {
		type: Filter.FILTER_STARTED
	};
}