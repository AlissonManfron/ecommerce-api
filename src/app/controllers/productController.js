import ProductDatabasePostgres from '../../database/product-database-postgres.js';

const database = new ProductDatabasePostgres();

const getAll = async (_, res) => {
  try{
    const products = await database.getAll();
    
    return res.send({ "products": products });
  } catch(err) {
    return res.status(400).send({ "error": true, "message": 'Get All Products Failed: ' + err });
  }
};

const create = async (req,res) => {
  const { title, description, price, imageUrl, category_id } = req.body

  try{
    await database.create({
      title,
      description,
      price,
      imageUrl,
      category_id
    });

    return res.send({ 
      title,
      description,
      price,
      imageUrl,
      category_id
    });
    
  } catch(err) {
    return res.status(400).send({ error: true, message: 'Error while creating the product: ' + err });
  }
};

const findById = async (req, res) => {
  const id = req.params.id;
  try{
    const product = await database.findById(id);

    if (product) {
      return res.send(product);
    } else {
      return res.status(404).send({ "error": true, "message": "Product Not Found" });
   }
    
  } catch(err) {
    return res.status(500).send({ error: true, message: 'Internal Server Error', details: err.message });
  }
};

const getRankeds = async (req, res) => {
  try{
    const products = await database.getRankeds();

    if (products) {
      return res.send({products: products});
    } else {
      return res.status(404).send({ error: true, message: "Products Not Found" });
   }
    
  } catch(err) {
    return res.status(500).send({ error: true, message: 'Internal Server Error', details: err.message });
  }
};

export default { create, findById, getRankeds, getAll };