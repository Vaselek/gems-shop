import models from '../../server/src/models';

export default async (props = {}) =>
  models.GemCoating.create(props);