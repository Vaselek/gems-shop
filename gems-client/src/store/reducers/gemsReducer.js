import {
  FETCH_GEMS_SUCCESS,
  CREATE_GEM_FAILURE,
  FETCH_GEM_SUCCESS,
  UPDATE_GEM_FAILURE,
  FETCH_GEM_FAILURE
} from "../actions/gemsActions";

const initialState = {
  gems: [],
  error: null,
  errorField: null,
  categoryId: null,
  filter: {},
  currentGem: null,
  generalError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GEMS_SUCCESS:
      return {...state, gems: action.gems, categoryId: action.categoryId, filter: action.filter};
    case CREATE_GEM_FAILURE:
      return {...state, error: action.error};
    case UPDATE_GEM_FAILURE:
      return {...state, error: action.error};
    case FETCH_GEM_SUCCESS:
      return {...state, currentGem: action.gem};
    case FETCH_GEM_FAILURE:
      return {...state, generalError: action.error};
    default:
      return state;
  }
};

export default reducer;
