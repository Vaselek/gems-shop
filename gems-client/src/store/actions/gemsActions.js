import axios from '../../axios-api';

export const FETCH_GEMS_SUCCESS = 'FETCH_GEMS_SUCCESS';
export const CREATE_GEM_SUCCESS = 'CREATE_GEM_SUCCESS';
export const CREATE_GEM_FAILURE = 'CREATE_GEM_FAILURE';

export const fetchGemsSuccess = (gems, categoryId) => ({type: FETCH_GEMS_SUCCESS, gems, categoryId});
export const createGemSuccess = () => ({type: CREATE_GEM_SUCCESS});
export const createGemFailure = (error) => ({type: CREATE_GEM_FAILURE, error});

export const fetchGems = (categoryId, filter) => {
  return dispatch => {
    let path = '/gems?categoryId=' + categoryId;
    if (filter && filter.stoneIds.length !== 0) {
      filter.stoneIds.map(stoneId => path += '&stoneIds=' + stoneId)
    }
    if (filter && filter.metalIds.length !== 0) {
      filter.metalIds.map(metalId => path += '&metalIds=' + metalId)
    }
    if (filter && filter.coatingIds.length !== 0) {
      filter.coatingIds.map(coatingId => path += '&coatingIds=' + coatingId)
    }
    return axios.get(path).then(
      response => {
        dispatch(fetchGemsSuccess(response.data.data, categoryId));
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
