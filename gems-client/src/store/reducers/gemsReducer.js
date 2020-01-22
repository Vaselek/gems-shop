import {FETCH_GEMS_SUCCESS, CREATE_GEM_FAILURE} from "../actions/gemsActions";

const initialState = {
  gems: [],
  error: null,
  errorField: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GEMS_SUCCESS:
      return {...state, gems: action.gems};
    case CREATE_GEM_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default reducer;
