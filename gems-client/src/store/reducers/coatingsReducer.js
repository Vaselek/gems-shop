import { FETCH_COATINGS_SUCCESS, CREATE_COATING_FAILURE } from "../actions/coatingsActions";

const initialState = {
  coatings: [],
  error: null
};


const coatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COATINGS_SUCCESS:
      return {...state, coatings: action.coatings};
    case CREATE_COATING_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default coatingsReducer;
