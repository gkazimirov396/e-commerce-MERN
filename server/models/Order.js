import { Schema, SchemaTypes, model } from 'mongoose';

import CartItem from './CartItem.js';

const orderSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: phoneNumber => {
          return /^\+380\d{3}\d{2}\d{2}\d{2}$/.test(phoneNumber);
        },
        message: '{VALUE} is not a valid phone number format.',
      },
    },
    address: {
      type: String,
      required: true,
    },
    products: [CartItem],
  },
  { timestamps: true }
);

export const Order = model('Order', orderSchema);
