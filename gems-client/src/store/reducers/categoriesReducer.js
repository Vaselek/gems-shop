import {FETCH_CATEGORIES_SUCCESS, CREATE_CATEGORY_FAILURE} from "../actions/categoriesActions";

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
    default:
      return state;
  }
};

export default categoriesReducer;
