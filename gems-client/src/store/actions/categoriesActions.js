import axios from '../../axios-api';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';

export const createCategorySuccess = () => ({type: CREATE_CATEGORY_SUCCESS});
export const createCategoryFailure = (error) => ({type: CREATE_CATEGORY_FAILURE, error});
export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});


export const fetchCategories = () => {
  return dispatch => {
    return axios.get('/categories').then(
      response => {
        dispatch(fetchCategoriesSuccess(response.data.data))
      }
    );
  };
};

export const createCategory = categoryData => {
  return (dispatch, getState) => {
    return axios.post('/categories', categoryData).then(
      () => {
        dispatch(createCategorySuccess());
        return 'success';
      },
      error => {
        dispatch(createCategoryFailure(error.response.data.message))
      }
    )
  }
};
