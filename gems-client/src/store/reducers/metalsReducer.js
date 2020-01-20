import { FETCH_METALS_SUCCESS } from "../actions/metalsActions";

const initialState = {
  metals: []
};


const metalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_METALS_SUCCESS:
      return {...state, metals: action.metals};
    default:
      return state;
  }
};

export default metalsReducer;
