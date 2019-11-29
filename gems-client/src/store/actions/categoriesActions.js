import axios from '../../axios-api';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});


export const fetchCategories = () => {
  return dispatch => {
    return axios.get('/api/v1/categories').then(
      response => {
        dispatch(fetchCategoriesSuccess(response.data.data))
      }
    );
  };
};
