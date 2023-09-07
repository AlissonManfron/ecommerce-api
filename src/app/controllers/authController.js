import "dotenv/config"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserDatabasePostgres from '../../database/user-database-postgres.js'

const { SECRET } = process.env;
const { compare } = bcrypt;
const database = new UserDatabasePostgres()

function generateToken(params = { }) {
  return jwt.sign({ params }, SECRET, {
    expiresIn: 86400,
  });
}

const register = async (req, res) => {
  const { name, email, password } = req.body

  try{

    if (await database.find(email))
      return res.status(400).send({ error: 'User already exists'});

    await database.create({
      name,
      email,
      password
    })

    return res.send({ 
      name, 
      email,
      token: generateToken({ email: email })
    });

  } catch(err) {
    return res.status(400).send({ error: 'Registration Failed' })
  }
}

const authenticate = async (req, res) => {
  try{
     const { email, password } = req.body

    const { name: userName, email: userEmail, password: userPassword } = await database.find(email)
    
    if (!userName)
      return res.status(400).send({ error: 'User Not Found' });

    if (!await compare(password, userPassword))
      return res.status(400).send({ error: 'Invalid Password' });

    return res.send({ 
      name: userName, 
      email: userEmail,
      token: generateToken({ email: email })
    });
  } catch(err) {
    return res.status(400).send({ error: 'Authenticate Failed: ' + err })
  }
}

const getAll = async  (req, res) => {
  try{
    const users = await database.getAll()
    
    return res.send({ "users": users })
  } catch(err) {
    return res.status(400).send({ error: 'Registration Failed' + err })
  }
}

export default { register, authenticate, getAll };