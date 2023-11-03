import { Router } from 'express';

import isAuth from '../middleware/is-auth.js';
import validation from '../middleware/validation.js';
import cartController from '../controllers/cartController.js';

const router = Router();

router.use(isAuth);

router.get('/', cartController.getCart);

router.post('/checkout', validation.checkoutCart, cartController.checkoutCart);

router
  .route('/:id')
  .put(validation.addToCart, cartController.addToCart)
  .delete(validation.productId, cartController.removeFromCart);

export default router;
