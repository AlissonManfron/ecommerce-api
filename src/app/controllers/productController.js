import express from 'express';
//const authMiddleware = require('../middlewares/auth');

const router =  express.Router();

//router.use(authMiddleware);

router.get('/', async (req,res) => {
  try{

      return res.send( { "error": true} );
    
  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.get('/:id', async (req,res) => {
  try{

    return res.send( { "error": true} );

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Product' + err });
  }
});

router.get('/search/:group', async (req,res) => {
  try{
  
    return res.send( { "error": true} );

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.get('/group/:limit', async (req,res) => {
  try{
    
    return res.send( { "error": true} );
  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.post('/', async (req,res) => {
  try{

    return res.send( { "error": true} );

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error creating new Product : ' + err });
  }
});

router.put('/:id', async (req,res) => {
  try{

    
    return res.send( { "error": true} );

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error updating new Product : ' + err });
  }
});

router.delete('/:id', async (req,res) => {
  try{

  
    return res.send( { "error": true} );

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error removing Product : ' + err });
  }
});

export default router;