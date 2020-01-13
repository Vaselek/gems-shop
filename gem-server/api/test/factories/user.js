import faker from 'faker';
import models from '../../server/src/models';

const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: faker.lorem.word(),
    role: 'user',
    token: faker.lorem.word()
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  models.User.create(await data(props));