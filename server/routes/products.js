import { Router } from 'express';

import validation from '../middleware/validation.js';
import productController from '../controllers/productController.js';

const router = Router();

router.get('/', validation.getProducts, productController.getProducts);

router.get('/:id', validation.productId, productController.getSingleProduct);

export default router;
