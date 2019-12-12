import faker from 'faker';
import models from '../../server/src/models';

export default async (props = {}) =>
  models.GemCategory.create(props);