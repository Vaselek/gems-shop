import axios from '../../axios-api';

export const FETCH_COATINGS_SUCCESS = 'FETCH_COATINGS_SUCCESS';

export const fetchCoatingsSuccess = coatings => ({type: FETCH_COATINGS_SUCCESS, coatings});


export const fetchCoatings = () => {
  return dispatch => {
    return axios.get('/coatings').then(
      response => {
        dispatch(fetchCoatingsSuccess(response.data.data))
      }
    );
  };
};
