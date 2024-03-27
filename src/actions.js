export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export const addToHistory = (item) => ({
  type: ADD_TO_HISTORY,
  payload: item,
});

export const clearHistory = () => ({
  type: CLEAR_HISTORY,
});