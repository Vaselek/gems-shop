import faker from 'faker';
import models from '../../server/src/models';

const data = async (props = {}) => {
  const defaultProps = {
    title: faker.lorem.word(),
    price: 100,
    weight: 10.0,
    image: 'gem.png'
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  models.Gem.create(await data(props));