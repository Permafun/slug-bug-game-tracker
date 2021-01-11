import { useCallback, useReducer } from 'react';

const scoreReducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				...state,
				[action.id]: state[action.id] + 1,
			};
		case 'DECREMENT':
			return {
				...state,
				[action.id]: state[action.id] - 1,
			};
		default:
			return state;
	}
};

export const useScore = (initialInputs) => {
	const [scoreState, dispatch] = useReducer(scoreReducer, initialInputs);

	const scoreHandler = useCallback((type, id) => {
		dispatch({ type: type, id: id });
	}, []);

	return [scoreState, scoreHandler];
};
