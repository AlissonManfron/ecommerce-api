import { verify } from 'jsonwebtoken';
import { secret } from '../../config/auth';

export default (req,res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });
  
  const parts = authHeader.split(' ');

  if (!parts.lenth === 2)
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  verify(token, secret, (err, decoded) => {
      if (err) res.status(401).send({ error: 'Token invalid' });
      req.userId = decoded.params.id;
      return next();
  });
}