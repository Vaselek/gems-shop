import UserService from '../services/UserService'

const auth = async (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(401).send({error: 'Token not provided'});
  }
  const user = await UserService.getAUserByToken(token);
  if (!user) {
    return res.status(401).send({error: 'Token incorrect'});
  }
  req.user = user;
  next();
};

export default auth;
