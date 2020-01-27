import {
  FETCH_METALS_SUCCESS,
  CREATE_METAL_FAILURE
} from "../actions/metalsActions";

const initialState = {
  metals: [],
  error: null
};


const metalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_METALS_SUCCESS:
      return {...state, metals: action.metals};
    case CREATE_METAL_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default metalsReducer;
