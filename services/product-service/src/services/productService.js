const productRepository = require('../repositories/productRepository');

const getProducts = async () => {
  return productRepository.findAll();
};

const getProductById = async (id) => {
  return productRepository.findById(id);
};

module.exports = {
  getProducts,
  getProductById
};