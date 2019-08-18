const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../config/auth');
const router = express.Router();

function generateToken(params = { }) {
  return jwt.sign({ params }, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req,res) => {
  const {email} = req.body;

  try{

    if (await User.findOne({email}))
    res.status(400).send({ error: 'User already exists'});

    const user = await User.create(req.body);
    
    user.password = undefined;
    
    return res.send({ 
      user, 
      token: generateToken({ id: user.id }),
    });

  } catch(err) {
    return res.status(400).send({ error: 'Registration Failed' });
  }
})
.post('/authenticate', async (req,res) => {
  try{
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');
    
    if (!user)
      return res.status(400).send({ error: 'User Not Found' });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid Password' });
      
    user.password = undefined;

    return res.send({ 
      user, 
      token:  generateToken({ id: user.id }),
    });
  } catch(err) {
    return res.status(400).send({ error: 'Authenticate Failed: ' + err });
  }
})
.get('/users', async  (req,res) => {
  try{
    const users = await User.find();
    return res.send({ users });
  } catch(err) {
    return res.status(400).send({ error: 'Registration Failed' + err });
  }
})
.delete('/users', async  (req,res) => {
  try{
    const users = await User.remove();
    return res.send({ users });
  } catch(err) {
    return res.status(400).send({ error: 'Delete Failed' + err });
  }
});

module.exports = app => app.use('/auth', router);