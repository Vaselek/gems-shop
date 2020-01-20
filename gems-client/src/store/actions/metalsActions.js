import axios from '../../axios-api';

export const FETCH_METALS_SUCCESS = 'FETCH_METALS_SUCCESS';

export const fetchMetalsSuccess = metals => ({type: FETCH_METALS_SUCCESS, metals});


export const fetchMetals = () => {
  return dispatch => {
    return axios.get('/metals').then(
      response => {
        dispatch(fetchMetalsSuccess(response.data.data))
      }
    );
  };
};
