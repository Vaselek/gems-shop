import faker from 'faker';
import models from '../../server/src/models';

const data = async (props = {}) => {
  const defaultProps = {
    title: faker.lorem.word()
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  models.Category.create(await data(props));