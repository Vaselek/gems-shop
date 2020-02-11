import axios from '../../axios-api';

export const FETCH_METALS_SUCCESS = 'FETCH_METALS_SUCCESS';

export const CREATE_METAL_SUCCESS = 'CREATE_METAL_SUCCESS';
export const CREATE_METAL_FAILURE = 'CREATE_METAL_FAILURE';

export const UPDATE_METAL_SUCCESS = 'UPDATE_METAL_SUCCESS';
export const UPDATE_METAL_FAILURE = 'UPDATE_METAL_FAILURE';

export const FETCH_METAL_SUCCESS = 'FETCH_METAL_SUCCESS';
export const FETCH_METAL_FAILURE = 'FETCH_METAL_FAILURE';

export const DELETE_METAL_SUCCESS = 'DELETE_METAL_SUCCESS';
export const DELETE_METAL_FAILURE = 'DELETE_METAL_FAILURE';


export const fetchMetalsSuccess = metals => ({type: FETCH_METALS_SUCCESS, metals});
export const createMetalSuccess = () => ({type: CREATE_METAL_SUCCESS});
export const createMetalFailure = (error) => ({type: CREATE_METAL_FAILURE, error});

export const updateMetalSuccess = () => ({type: UPDATE_METAL_SUCCESS});
export const updateMetalFailure = error => ({type: UPDATE_METAL_FAILURE, error});

export const fetchMetalSuccess = metal => ({type: FETCH_METAL_SUCCESS, metal});
export const fetchMetalFailure = error => ({type: FETCH_METAL_FAILURE, error});

export const deleteMetalSuccess = () => ({type: DELETE_METAL_SUCCESS});
export const deleteMetalFailure = error => ({type: DELETE_METAL_FAILURE, error});



export const fetchMetals = (sort) => {
  return dispatch => {
    let path = '/metals';
    if (sort) path += '?sortField=' + sort.sortField + '&sortOrder=' + sort.sortOrder;
    return axios.get(path).then(
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
        dispatch(createMetalSuccess());
        return 'success';
      },
      error => {
        dispatch(createMetalFailure(error.response.data.message))
      }
    )
  }
};

export const updateMetal = metalData => {
  return (dispatch, getState) => {
    return axios.put('/metals/' + metalData.get('id'), metalData).then(
      response => {
        dispatch(updateMetalSuccess(response));
        return 'success';
      },
      error => {
        dispatch(updateMetalFailure(error.response.data.message))
      }
    )
  }
};

export const fetchMetal = (id) => {
  return dispatch => {
    const path = '/metals/' + id;
    return axios.get(path).then(
      response => {
        dispatch(fetchMetalSuccess(response.data.data));
      },
      error => {
        dispatch(fetchMetalFailure(error.response.data.message));
      }
    );
  }
};

export const deleteMetal = (metalId) => {
  return (dispatch) => {
    return axios.delete('/metals/' + metalId).then(
      () => {
        dispatch(deleteMetalSuccess(metalId));
      },
      error => {
        dispatch(deleteMetalFailure(error))
      }
    )
  }
};
