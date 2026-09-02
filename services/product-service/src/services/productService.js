const productRepository = require("../repositories/productRepository");
const { redisClient } = require("../config/redis");

const CACHE_TTL = 60;

const getProducts = async () => {
  return productRepository.findAll();
};

const getProductById = async (id) => {
  const cacheKey = `product:${id}`;

  const cachedProduct = await redisClient.get(cacheKey);

  if (cachedProduct) {
    console.log(`Cache HIT: ${cacheKey}`);

    return JSON.parse(cachedProduct);
  }

  console.log(`Cache MISS: ${cacheKey}`);

  const product = await productRepository.findById(id);

  if (product) {
    redisClient
      .set(cacheKey, JSON.stringify(product), {
        EX: CACHE_TTL,
      })
      .catch((error) => {
        console.error(`Failed to cache ${cacheKey}:`, error);
      });
  }

  return product;
};

module.exports = {
  getProducts,
  getProductById,
};
