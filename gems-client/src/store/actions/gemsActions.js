import axios from '../../axios-api';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

export const fetchGemsSuccess = gems => ({type: FETCH_PRODUCTS_SUCCESS, gems});
export const createGemSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});

export const fetchGems = (categoryId) => {
  return dispatch => {
    let path = '/gems';

    if (categoryId) {
      path += '?category=' + categoryId;
    }
    return axios.get(path).then(
      response => dispatch(fetchGemsSuccess(response.data))
    );
  };
};

export const createGem = gemData => {
  return (dispatch, getState) => {
    return axios.post('/gems', gemData).then(
      () => dispatch(createGemSuccess())
    );
  };
};
