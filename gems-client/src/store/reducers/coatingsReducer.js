import {
  FETCH_COATINGS_SUCCESS,
  CREATE_COATING_FAILURE,
  CREATE_COATING_SUCCESS,
  FETCH_COATING_SUCCESS,
  FETCH_COATING_FAILURE,
  UPDATE_COATING_SUCCESS,
  UPDATE_COATING_FAILURE,
  DELETE_COATING_SUCCESS,
  DELETE_COATING_FAILURE
} from "../actions/coatingsActions";

const initialState = {
  coatings: [],
  error: null,
  currentCoating: null,
  shouldCoatingsBeUpdated: false,
  generalError: null
};


const coatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COATINGS_SUCCESS:
      return {...state, coatings: action.coatings, shouldCoatingsBeUpdated: false};
    case CREATE_COATING_FAILURE:
      return {...state, error: action.error};
    case CREATE_COATING_SUCCESS:
      return {...state, error: null};
    case FETCH_COATING_SUCCESS:
      return {...state, currentCoating: action.coating, generalError: null};
    case FETCH_COATING_FAILURE:
      return {...state, generalError: action.error};
    case UPDATE_COATING_FAILURE:
      return {...state, error: action.error};
    case UPDATE_COATING_SUCCESS:
      return {...state, error: null, shouldCoatingsBeUpdated: true};
    case DELETE_COATING_FAILURE:
      return {...state, generalError: action.error};
    case DELETE_COATING_SUCCESS:
      return {...state, generalError: null, shouldCoatingsBeUpdated: true};
    default:
      return state;
  }
};

export default coatingsReducer;
