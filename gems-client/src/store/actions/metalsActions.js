import axios from '../../axios-api';

export const FETCH_METALS_SUCCESS = 'FETCH_METALS_SUCCESS';
export const CREATE_METAL_SUCCESS = 'CREATE_METAL_SUCCESS';
export const CREATE_METAL_FAILURE = 'CREATE_METAL_FAILURE';

export const fetchMetalsSuccess = metals => ({type: FETCH_METALS_SUCCESS, metals});
export const createMetalSuccess = () => ({type: CREATE_METAL_SUCCESS});
export const createMetalFailure = (error) => ({type: CREATE_METAL_FAILURE, error});



export const fetchMetals = () => {
  return dispatch => {
    return axios.get('/metals').then(
      response => {
        dispatch(fetchMetalsSuccess(response.data.data))
      }
    );
  };
};

export const createMetal = metalData => {
  return (dispatch, getState) => {
    return axios.post('/metals', metalData).then(
      () => {
        dispatch(createMetalSuccess())
        return 'success';
      },
      error => {
        dispatch(createMetalFailure(error.response.data.message))
      }
    ).then(
      dispatch(fetchMetals())
    )
  }
}
