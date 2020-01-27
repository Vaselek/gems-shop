import axios from '../../axios-api';

export const FETCH_COATINGS_SUCCESS = 'FETCH_COATINGS_SUCCESS';
export const CREATE_COATING_SUCCESS = 'CREATE_COATING_SUCCESS';
export const CREATE_COATING_FAILURE = 'CREATE_COATING_FAILURE';

export const fetchCoatingsSuccess = coatings => ({type: FETCH_COATINGS_SUCCESS, coatings});
export const createCoatingSuccess = () => ({type: CREATE_COATING_SUCCESS});
export const createCoatingFailure = (error) => ({type: CREATE_COATING_FAILURE, error});

export const fetchCoatings = () => {
  return dispatch => {
    return axios.get('/coatings').then(
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
}
