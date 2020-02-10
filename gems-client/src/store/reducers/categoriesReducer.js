import {
  FETCH_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE
} from "../actions/categoriesActions";


const initialState = {
  categories: [],
  error: null,
  shouldCategoriesBeUpdated: false,
  currentCategory: null,
  generalError: null
};


const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories, shouldCategoriesBeUpdated: false};
    case CREATE_CATEGORY_FAILURE:
      return {...state, error: action.error};
    case CREATE_CATEGORY_SUCCESS:
      return {...state, error: null};
    case DELETE_CATEGORY_FAILURE:
      return {...state, generalError: action.error};
    case DELETE_CATEGORY_SUCCESS:
      return {...state, generalError: null, shouldCategoriesBeUpdated: true};
    case UPDATE_CATEGORY_FAILURE:
      return {...state, error: action.error};
    case UPDATE_CATEGORY_SUCCESS:
      return {...state, error: null, shouldCategoriesBeUpdated: true};
    case FETCH_CATEGORY_SUCCESS:
      return {...state, currentCategory: action.category, generalError: null};
    case FETCH_CATEGORY_FAILURE:
      return {...state, generalError: action.error};
    default:
      return state;
  }
};

export default categoriesReducer;
