import {
  FETCH_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
  categories: [],
  error: null
};


const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    case CREATE_CATEGORY_FAILURE:
      return {...state, error: action.error};
    case CREATE_CATEGORY_SUCCESS:
      return {...state, error: null};
    default:
      return state;
  }
};

export default categoriesReducer;
