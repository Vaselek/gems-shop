import models from '../../server/src/models';

export default async (props = {}) =>
  models.GemMetal.create(props);