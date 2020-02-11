import axios from '../../axios-api';


export const FETCH_COATINGS_SUCCESS = 'FETCH_COATINGS_SUCCESS';

export const CREATE_COATING_SUCCESS = 'CREATE_COATING_SUCCESS';
export const CREATE_COATING_FAILURE = 'CREATE_COATING_FAILURE';

export const UPDATE_COATING_SUCCESS = 'UPDATE_COATING_SUCCESS';
export const UPDATE_COATING_FAILURE = 'UPDATE_COATING_FAILURE';

export const FETCH_COATING_SUCCESS = 'FETCH_COATING_SUCCESS';
export const FETCH_COATING_FAILURE = 'FETCH_COATING_FAILURE';

export const DELETE_COATING_SUCCESS = 'DELETE_COATING_SUCCESS';
export const DELETE_COATING_FAILURE = 'DELETE_COATING_FAILURE';


export const fetchCoatingsSuccess = coatings => ({type: FETCH_COATINGS_SUCCESS, coatings});

export const createCoatingSuccess = () => ({type: CREATE_COATING_SUCCESS});
export const createCoatingFailure = (error) => ({type: CREATE_COATING_FAILURE, error});

export const updateCoatingSuccess = () => ({type: UPDATE_COATING_SUCCESS});
export const updateCoatingFailure = error => ({type: UPDATE_COATING_FAILURE, error});

export const fetchCoatingSuccess = coating => ({type: FETCH_COATING_SUCCESS, coating});
export const fetchCoatingFailure = error => ({type: FETCH_COATING_FAILURE, error});

export const deleteCoatingSuccess = () => ({type: DELETE_COATING_SUCCESS});
export const deleteCoatingFailure = error => ({type: DELETE_COATING_FAILURE, error});

export const fetchCoatings = (sort) => {
  return dispatch => {
    let path = '/coatings';
    if (sort) path += '?sortField=' + sort.sortField + '&sortOrder=' + sort.sortOrder;
    return axios.get(path).then(
      response => {
        dispatch(fetchCoatingsSuccess(response.data.data))
      }
    );
  };
};

export const createCoating = stoneData => {
  return (dispatch, getState) => {
    return axios.post('/coatings', stoneData).then(
      () => {
        dispatch(createCoatingSuccess());
        return 'success';
      },
      error => {
        dispatch(createCoatingFailure(error.response.data.message))
      }
    )
  }
};

export const updateCoating = coatingData => {
  return (dispatch, getState) => {
    return axios.put('/coatings/' + coatingData.get('id'), coatingData).then(
      response => {
        dispatch(updateCoatingSuccess(response));
        return 'success';
      },
      error => {
        dispatch(updateCoatingFailure(error.response.data.message))
      }
    )
  }
};

export const fetchCoating = (id) => {
  return dispatch => {
    const path = '/coatings/' + id;
    return axios.get(path).then(
      response => {
        dispatch(fetchCoatingSuccess(response.data.data));
      },
      error => {
        dispatch(fetchCoatingFailure(error.response.data.message));
      }
    );
  }
};

export const deleteCoating = (coatingId) => {
  return (dispatch) => {
    return axios.delete('/coatings/' + coatingId).then(
      () => {
        dispatch(deleteCoatingSuccess(coatingId));
      },
      error => {
        dispatch(deleteCoatingFailure(error))
      }
    )
  }
};
