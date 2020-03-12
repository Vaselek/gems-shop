export const apiURL = 'http://localhost:8000';
export const defaultGemsLimit = 30;
export const defaultGemParams  = {
  categoryId: null,
  search: null,
  filter: {
    stoneIds: [],
    metalIds: [],
    coatingIds: []
  },
  sort: {
    field: null,
    order: null
  },
  pagination: {
    limit: defaultGemsLimit,
    offset: null
  }
};
