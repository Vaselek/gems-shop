import axios from '../../axios-api';

export const FETCH_STONES_SUCCESS = 'FETCH_STONES_SUCCESS';

export const fetchStonesSuccess = stones => ({type: FETCH_STONES_SUCCESS, stones});


export const fetchStones = () => {
  return dispatch => {
    return axios.get('/stones').then(
      response => {
        dispatch(fetchStonesSuccess(response.data.data))
      }
    );
  };
};
