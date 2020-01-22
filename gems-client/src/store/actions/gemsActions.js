import axios from '../../axios-api';

export const FETCH_GEMS_SUCCESS = 'FETCH_GEMS_SUCCESS';
export const CREATE_GEM_SUCCESS = 'CREATE_GEM_SUCCESS';
export const CREATE_GEM_FAILURE = 'CREATE_GEM_FAILURE';

export const fetchGemsSuccess = gems => ({type: FETCH_GEMS_SUCCESS, gems});
export const createGemSuccess = () => ({type: CREATE_GEM_SUCCESS});
export const createGemFailure = (error) => ({type: CREATE_GEM_FAILURE, error});

export const fetchGems = (categoryId) => {
  return dispatch => {
    let path = '/categories/' + categoryId;
    // if (categoryId) {
    //   path += '?category=' + categoryId;
    // }
    return axios.get(path).then(
      response => {
        dispatch(fetchGemsSuccess(response.data.data.gems));
      }
    );
  };
};

export const createGem = gemData => {
  return (dispatch, getState) => {
    return axios.post('/gems', gemData).then(
      response => {
        dispatch(createGemSuccess(response))
        return 'success'
      },
      error => {
        dispatch(createGemFailure(error.response.data.message))
      }
    );
  };
};
