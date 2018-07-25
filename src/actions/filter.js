export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const filterSuccess = (filter) => ({
	type: FILTER_SUCCESS,
	filter
});

// Advanced Filter action
export const SET_START_VALUE = 'SET_START_VALUE';
export const setStartValue = (start) => ({
	type: SET_START_VALUE,
	start
});

// Advanced Filter action
export const SET_END_VALUE = 'SET_END_VALUE';
export const setEndValue = (end) => ({
	type: SET_END_VALUE,
	end
});

// For when start and end are fused into the filter string
export const ADVANCED_FILTER_SUCCESS = 'ADVANCED_FILTER_SUCCESS';
export const advancedFilterSuccess = (filter) => ({
	type: ADVANCED_FILTER_SUCCESS,
	filter
});
