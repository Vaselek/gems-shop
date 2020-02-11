import {
  FETCH_METALS_SUCCESS,
  CREATE_METAL_FAILURE,
  CREATE_METAL_SUCCESS,
  FETCH_METAL_SUCCESS,
  FETCH_METAL_FAILURE,
  UPDATE_METAL_SUCCESS,
  UPDATE_METAL_FAILURE,
  DELETE_METAL_SUCCESS,
  DELETE_METAL_FAILURE
} from "../actions/metalsActions";


const initialState = {
  metals: [],
  error: null,
  currentMetal: null,
  shouldMetalsBeUpdated: false,
  generalError: null
};


const metalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_METALS_SUCCESS:
      return {...state, metals: action.metals};
    case CREATE_METAL_FAILURE:
      return {...state, error: action.error};
    case CREATE_METAL_SUCCESS:
      return {...state, error: null};
    case FETCH_METAL_SUCCESS:
      return {...state, currentMetal: action.metal, generalError: null};
    case FETCH_METAL_FAILURE:
      return {...state, generalError: action.error};
    case UPDATE_METAL_FAILURE:
      return {...state, error: action.error};
    case UPDATE_METAL_SUCCESS:
      return {...state, error: null, shouldMetalsBeUpdated: true};
    case DELETE_METAL_FAILURE:
      return {...state, generalError: action.error};
    case DELETE_METAL_SUCCESS:
      return {...state, generalError: null, shouldMetalsBeUpdated: true};
    default:
      return state;
  }
};

export default metalsReducer;
