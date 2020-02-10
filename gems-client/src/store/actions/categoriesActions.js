import axios from '../../axios-api';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';


export const createCategorySuccess = () => ({type: CREATE_CATEGORY_SUCCESS});
export const createCategoryFailure = (error) => ({type: CREATE_CATEGORY_FAILURE, error});

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});

export const deleteCategorySuccess = () => ({type: DELETE_CATEGORY_SUCCESS});
export const deleteCategoryFailure = error => ({type: DELETE_CATEGORY_FAILURE, error});


export const updateCategorySuccess = () => ({type: UPDATE_CATEGORY_SUCCESS});
export const updateCategoryFailure = error => ({type: UPDATE_CATEGORY_FAILURE, error});

export const fetchCategorySuccess = category => ({type: FETCH_CATEGORY_SUCCESS, category});
export const fetchCategoryFailure = error => ({type: FETCH_CATEGORY_FAILURE, error});


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

export const deleteCategory = (categoryId) => {
  return (dispatch) => {
    return axios.delete('/categories/' + categoryId).then(
      () => {
        dispatch(deleteCategorySuccess(categoryId));
      },
      error => {
        dispatch(deleteCategoryFailure(error))
      }
    )
  }
};

export const updateCategory = categoryData => {
  return (dispatch, getState) => {
    return axios.put('/categories/' + categoryData.get('id'), categoryData).then(
      response => {
        dispatch(updateCategorySuccess(response));
        return 'success';
      },
      error => {
        dispatch(updateCategoryFailure(error.response.data.message))
      }
    )
  }
};

export const fetchCategory = (id) => {
  return dispatch => {
    const path = '/categories/' + id;
    return axios.get(path).then(
      response => {
        dispatch(fetchCategorySuccess(response.data.data));
      },
      error => {
        dispatch(fetchCategoryFailure(error.response.data.message));
      }
    );
  }
};