import {
  CREATE_STONE_FAILURE,
  FETCH_STONES_SUCCESS,
  CREATE_STONE_SUCCESS,
  UPDATE_STONE_FAILURE,
  FETCH_STONE_SUCCESS,
  FETCH_STONE_FAILURE,
  UPDATE_STONE_SUCCESS,
  DELETE_STONE_SUCCESS,
  DELETE_STONE_FAILURE
} from "../actions/stonesActions";

const initialState = {
  stones: [],
  error: null,
  currentStone: null,
  shouldStonesBeUpdated: false,
  generalError: null
};


const stonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STONES_SUCCESS:
      return {...state, stones: action.stones, shouldStonesBeUpdated: false};
    case CREATE_STONE_FAILURE:
      return {...state, error: action.error};
    case CREATE_STONE_SUCCESS:
      return {...state, error: null, shouldStonesBeUpdated: true};
    case FETCH_STONE_SUCCESS:
      return {...state, currentStone: action.stone, generalError: null};
    case FETCH_STONE_FAILURE:
      return {...state, generalError: action.error};
    case UPDATE_STONE_FAILURE:
      return {...state, error: action.error};
    case UPDATE_STONE_SUCCESS:
      return {...state, error: null, shouldStonesBeUpdated: true};
    case DELETE_STONE_FAILURE:
      return {...state, generalError: action.error};
    case DELETE_STONE_SUCCESS:
      return {...state, generalError: null, shouldStonesBeUpdated: true};
    default:
      return state;
  }
};

export default stonesReducer;
