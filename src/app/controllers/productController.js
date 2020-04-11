const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Product = require('../models/product');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req,res) => {
  try{

    const products = await Product.find();
    
    return res.send({ products });

  } catch(err) {
    return res.status(400).send({ error: 'Error loading Products' + err });
  }
});

router.get('/:id', async (req,res) => {
  try{

    const product = await Product.findById(req.params.id);
    
    return res.send({ product });

  } catch(err) {
    return res.status(400).send({ error: 'Error loading Product' + err });
  }
});

router.post('/', async (req,res) => {
  try{

    const { description, price }= req.body;

    const product = await Product.create({ description, price });

    return res.send({ product });

  } catch(err) {
    return res.status(400).send({ error: 'Error creating new Product : ' + err });
  }
});

router.put('/:id', async (req,res) => {
  try{

    const { description, price }= req.body;

    const product = await Product.findByIdAndUpdate( req.params.id, {
      description,
      price
    }, { new: true });

    return res.send({ product });

  } catch(err) {
    return res.status(400).send({ error: 'Error updating new Product : ' + err });
  }
});

router.delete('/:id', async (req,res) => {
  try{

    await Product.findByIdAndRemove(req.params.id);
    
    return res.send({ status: 'ok'});

  } catch(err) {
    return res.status(400).send({ error: 'Error removing Product : ' + err });
  }
});

module.exports = app => app.use('/products', router);