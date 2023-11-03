import { Schema, SchemaTypes } from 'mongoose';

const CartItemSchema = new Schema({
  productId: {
    type: SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    min: [1, 'Must be at least 1, but got {VALUE}.'],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export default CartItemSchema;
