import { FETCH_STONES_SUCCESS } from "../actions/stonesActions";

const initialState = {
  stones: []
};


const stonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STONES_SUCCESS:
      return {...state, stones: action.stones};
    default:
      return state;
  }
};

export default stonesReducer;
