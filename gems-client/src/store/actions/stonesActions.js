import axios from '../../axios-api';

export const FETCH_STONES_SUCCESS = 'FETCH_STONES_SUCCESS';
export const CREATE_STONE_SUCCESS = 'CREATE_STONE_SUCCESS';
export const CREATE_STONE_FAILURE = 'CREATE_STONE_FAILURE';

export const createStoneSuccess = () => ({type: CREATE_STONE_SUCCESS});
export const createStoneFailure = (error) => ({type: CREATE_STONE_FAILURE, error});
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

export const createStone = stoneData => {
  return (dispatch, getState) => {
    return axios.post('/stones', stoneData).then(
      () => {
        dispatch(createStoneSuccess());
        return 'success';
      },
      error => {
        dispatch(createStoneFailure(error.response.data.message))
      }
    )
  }
}
