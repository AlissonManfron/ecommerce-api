const mongoose = require('../../database');

var SchemaTypes = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  price: {
    type: SchemaTypes.Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Product', ProductSchema);

module.exports = Project;