import axios from '../../axios-api';

export const FETCH_STONES_SUCCESS = 'FETCH_STONES_SUCCESS';
export const CREATE_STONE_SUCCESS = 'CREATE_STONE_SUCCESS';
export const CREATE_STONE_FAILURE = 'CREATE_STONE_FAILURE';

export const UPDATE_STONE_SUCCESS = 'UPDATE_STONE_SUCCESS';
export const UPDATE_STONE_FAILURE = 'UPDATE_STONE_FAILURE';

export const FETCH_STONE_SUCCESS = 'FETCH_STONE_SUCCESS';
export const FETCH_STONE_FAILURE = 'FETCH_STONE_FAILURE';

export const DELETE_STONE_SUCCESS = 'DELETE_STONE_SUCCESS';
export const DELETE_STONE_FAILURE = 'DELETE_STONE_FAILURE';


export const createStoneSuccess = () => ({type: CREATE_STONE_SUCCESS});
export const createStoneFailure = (error) => ({type: CREATE_STONE_FAILURE, error});
export const fetchStonesSuccess = stones => ({type: FETCH_STONES_SUCCESS, stones});

export const updateStoneSuccess = () => ({type: UPDATE_STONE_SUCCESS});
export const updateStoneFailure = error => ({type: UPDATE_STONE_FAILURE, error});

export const fetchStoneSuccess = stone => ({type: FETCH_STONE_SUCCESS, stone});
export const fetchStoneFailure = error => ({type: FETCH_STONE_FAILURE, error});

export const deleteStoneSuccess = () => ({type: DELETE_STONE_SUCCESS});
export const deleteStoneFailure = error => ({type: DELETE_STONE_FAILURE, error});


export const fetchStones = (sort) => {
  return dispatch => {
    let path = '/stones';
    if (sort) path += '?sortField=' + sort.sortField + '&sortOrder=' + sort.sortOrder;
    return axios.get(path).then(
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
};

export const updateStone = stoneData => {
  return (dispatch, getState) => {
    return axios.put('/stones/' + stoneData.get('id'), stoneData).then(
      response => {
        dispatch(updateStoneSuccess(response));
        return 'success';
      },
      error => {
        dispatch(updateStoneFailure(error.response.data.message))
      }
    )
  }
};

export const fetchStone = (id) => {
  return dispatch => {
    const path = '/stones/' + id;
    return axios.get(path).then(
      response => {
        dispatch(fetchStoneSuccess(response.data.data));
      },
      error => {
        dispatch(fetchStoneFailure(error.response.data.message));
      }
    );
  }
};

export const deleteStone = (stoneId) => {
  return (dispatch) => {
    return axios.delete('/stones/' + stoneId).then(
      () => {
        dispatch(deleteStoneSuccess(stoneId));
      },
      error => {
        dispatch(deleteStoneFailure(error))
      }
    )
  }
};
