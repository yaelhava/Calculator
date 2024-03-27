// reducer.js
import { ADD_TO_HISTORY, CLEAR_HISTORY } from './actions';

const initialState = {
  history: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: [action.payload, ...state.history.slice(0, 19)],
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
};

export default reducer;
