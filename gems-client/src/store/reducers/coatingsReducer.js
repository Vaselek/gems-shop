import { FETCH_COATINGS_SUCCESS } from "../actions/coatingsActions";

const initialState = {
  coatings: []
};


const coatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COATINGS_SUCCESS:
      return {...state, coatings: action.coatings};
    default:
      return state;
  }
};

export default coatingsReducer;
