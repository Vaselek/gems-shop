import {FETCH_PRODUCTS_SUCCESS} from "../actions/gemsActions";

const initialState = {
  gems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, gems: action.gems};
    default:
      return state;
  }
};

export default reducer;
