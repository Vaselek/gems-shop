import axios from '../../axios-api';

export const FETCH_GEMS_SUCCESS = 'FETCH_GEMS_SUCCESS';

export const FETCH_GEM_SUCCESS = 'FETCH_GEM_SUCCESS';
export const FETCH_GEM_FAILURE = 'FETCH_GEM_FAILURE';

export const CREATE_GEM_SUCCESS = 'CREATE_GEM_SUCCESS';
export const CREATE_GEM_FAILURE = 'CREATE_GEM_FAILURE';

export const UPDATE_GEM_SUCCESS = 'UPDATE_GEM_SUCCESS';
export const UPDATE_GEM_FAILURE = 'UPDATE_GEM_FAILURE';



export const fetchGemsSuccess = (gems, totalCount, gemParams) => ({type: FETCH_GEMS_SUCCESS, gems, totalCount, gemParams});
export const fetchGemSuccess = (gem) => ({type: FETCH_GEM_SUCCESS, gem});

export const fetchGemFailure = (error) => ({type: FETCH_GEM_FAILURE, error});

export const createGemSuccess = () => ({type: CREATE_GEM_SUCCESS});
export const createGemFailure = (error) => ({type: CREATE_GEM_FAILURE, error});

export const updateGemSuccess = () => ({type: UPDATE_GEM_SUCCESS});
export const updateGemFailure = (error) => ({type: UPDATE_GEM_FAILURE, error});





export const fetchGem = (id) => {
  return dispatch => {
    const path = '/gems/' + id;
    return axios.get(path).then(
      response => {
        dispatch(fetchGemSuccess(response.data.data));
      },
      error => {
        dispatch(fetchGemFailure(error.response.data.message));
      }
    );
  }
}

export const fetchGems = (gemParams) => {
  const { categoryId, filter, sortBy, pagination } = gemParams;
  return dispatch => {
    let path = '/gems';
    let delimeter ='?';
    if (categoryId)  {
      path += delimeter + 'categoryId=' + categoryId;
      delimeter = '&';
    }
    if (filter && filter.stoneIds.length !== 0) {
      filter.stoneIds.map(stoneId => {
        path += delimeter + 'stoneIds=' + stoneId;
        delimeter = '&';
        return path;
      })
    }
    if (filter && filter.metalIds.length !== 0) {
      filter.metalIds.map(metalId => {
        path += delimeter + 'metalIds=' + metalId;
        delimeter = '&';
        return path;
      })
    }
    if (filter && filter.coatingIds.length !== 0) {
      filter.coatingIds.map(coatingId => {
        path += delimeter + '&coatingIds=' + coatingId;
        delimeter = '&';
        return path;
      })
    }
    if (sortBy) {
      path += delimeter + 'sort=' + sortBy;
      delimeter = '&'
    }
    if (pagination && pagination.limit) {
      path += delimeter + 'limit=' + pagination.limit;
      delimeter = '&'
    }
    if (pagination && pagination.offset) {
      path += delimeter + 'offset=' + pagination.offset;
      delimeter = '&'
    }
    return axios.get(path).then(
      response => {
        dispatch(fetchGemsSuccess(response.data.data.gems, response.data.data.totalCount, gemParams));
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

export const updateGem = gemData => {
  return (dispatch, getState) => {
    return axios.put('/gems/' + gemData.get('id'), gemData).then(
      response => {
        dispatch(updateGemSuccess(response));
        return 'success';
      },
      error => {
        dispatch(updateGemFailure(error.response.data.message))
      }
    )
  }
}
