import {CREATE_STONE_FAILURE, FETCH_STONES_SUCCESS} from "../actions/stonesActions";

const initialState = {
  stones: [],
  error: null
};


const stonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STONES_SUCCESS:
      return {...state, stones: action.stones};
    case CREATE_STONE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default stonesReducer;
