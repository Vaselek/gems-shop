import {
  FETCH_METALS_SUCCESS,
  CREATE_METAL_FAILURE,
  CREATE_METAL_SUCCESS
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
    case CREATE_METAL_SUCCESS:
      return {...state, error: null};
    default:
      return state;
  }
};

export default metalsReducer;
