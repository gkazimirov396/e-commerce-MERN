import { Schema, model } from 'mongoose';

import CartItem from './CartItem.js';

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'E-mail must be provided.'],
      validate: {
        validator: email => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: '{VALUE} is not a valid email.',
      },
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Name must be provided.'],
    },
    password: {
      type: String,
      required: [true, 'Password must be provided.'],
    },
    cart: [CartItem],
  },
  {
    methods: {
      addToCart(product) {
        const existingItem = this.cart.find(
          item => item.productId.toString() === product.productId.toString()
        );

        if (!existingItem) {
          this.cart.push(product);
        } else {
          existingItem.quantity += product.quantity;
          existingItem.totalPrice += product.totalPrice;
        }

        return this.save();
      },
      removeFromCart(id, remove) {
        const existingItem = this.cart.find(
          item => item.productId.toString() === id.toString()
        );

        if (!existingItem) {
          const error = new Error('An item with this id does not exist.');
          error.status = 404;
          throw error;
        }

        if (existingItem.quantity === 1 || remove) {
          this.cart = this.cart.filter(
            item => item.productId.toString() !== id.toString()
          );
        } else {
          const price = existingItem.totalPrice / existingItem.quantity;
          existingItem.quantity--;
          existingItem.totalPrice -= price;
        }

        return this.save();
      },
      clearCart() {
        this.cart = [];
        return this.save();
      },
    },
  }
);

export const User = model('User', userSchema);
