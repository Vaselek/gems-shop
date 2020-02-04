import {
  FETCH_GEMS_SUCCESS,
  CREATE_GEM_FAILURE,
  FETCH_GEM_SUCCESS,
  UPDATE_GEM_FAILURE,
  FETCH_GEM_FAILURE
} from "../actions/gemsActions";
import {defaultGemParams} from "../../constants";
import {cloneDeep} from 'lodash';


const initialState = {
  gems: [],
  error: null,
  errorField: null,
  gemParams: cloneDeep(defaultGemParams),
  currentGem: null,
  generalError: null,
  totalCount: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GEMS_SUCCESS:
      return {...state, gems: action.gems, totalCount: action.totalCount, gemParams: action.gemParams};
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
