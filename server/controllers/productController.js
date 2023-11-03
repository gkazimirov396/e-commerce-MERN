import { Product } from '../models/Product.js';

const getProducts = async (req, res, next) => {
  const { category } = req.query;

  try {
    const products = !category
      ? await Product.find()
      : await Product.find({ gender: category });

    res.json(products);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Could not find product.');
      error.status = 404;
      throw error;
    }

    res.json(product);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export default { getProducts, getSingleProduct };
