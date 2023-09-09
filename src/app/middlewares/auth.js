import "dotenv/config"
import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });
  
  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) return res.status(401).send({ error: 'Token invalid' });
      req.userEmail = decoded.params.email;
      return next();
  });
}