const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Product = require('../models/product');

const router = express.Router();

//router.use(authMiddleware);

router.get('/', async (req,res) => {
  try{

    const products = await Product.find();

    if (products.length > 0) {
      return res.send( { "error": false, "products": products } );
    } else {
      return res.send( { "error": true, "products": products } );
    }
  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.get('/:id', async (req,res) => {
  try{

    const product = await Product.findById(req.params.id);
    
    return res.send({ product });

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Product' + err });
  }
});

router.get('/search/:group', async (req,res) => {
  try{
    query = {};
    if (req.params.group !== undefined) {
        query = {
            group: new RegExp(req.params.group, 'i')
        };
    }
    
    await Product.find(query, function(err, products) {
      if (err) {
        return res.send([ { "error": true, "products": products } ]);
      } else {
        if (products.length > 0) {
          return res.send([ { "error": false, "products": products } ]);
        } else {
          return res.send([ { "error": true, "products": products } ]);
        }
      }
    });

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.get('/group/:limit', async (req,res) => {
  try{
    await Product.aggregate([
      {$sort:{group:1, description:1}},
      {
        $group:{
          _id:"$group",
          products:{
            $push:{
              _id:"$_id", 
              description:"$description", 
              price:"$price"
            }
          }
        }
      }, 
      {
        $project:{
          products:{
            $slice:["$products", 
            Number(req.params.limit)
          ]
        }
      }
    }
    ], function(err, result) {
      if (err) throw err;
      return res.send({ result });
    });

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.get('/search/:group/limit/:limit', async (req,res) => {
  try{
    query = {};
    if (req.params.group !== undefined) {
        query = {
            group: new RegExp(req.params.group, 'i')
        };
    }
    
    await Product.find(query, function(err, products) {
      if (err) {
        return res.send([ { "error": true, "products": products } ]);
      } else {
        if (products.length > 0) {
          return res.send([ { "error": false, "products": products } ]);
        } else {
          return res.send([ { "error": true, "products": products } ]);
        }
      }
    }).limit(Number(req.params.limit));

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error loading Products' + err });
  }
});

router.post('/', async (req,res) => {
  try{

    console.log(req.body);
    const { description, price, imageUrl, group }= req.body;

    const product = await Product.create({ description, price, imageUrl, group });

    return res.send({ product });

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error creating new Product : ' + err });
  }
});

router.put('/:id', async (req,res) => {
  try{

    const { description, price, imageUrl, group }= req.body;

    const product = await Product.findByIdAndUpdate( req.params.id, {
      description,
      price,
      imageUrl,
      group
    }, { new: true });

    return res.send({ product });

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error updating new Product : ' + err });
  }
});

router.delete('/:id', async (req,res) => {
  try{

    await Product.findByIdAndRemove(req.params.id);
    
    return res.send({ status: 'ok', "id": req.params.id});

  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Error removing Product : ' + err });
  }
});

module.exports = app => app.use('/products', router);