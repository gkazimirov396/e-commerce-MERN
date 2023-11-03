import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message:
        '{VALUE} is not supported. The only possible values are "female" and "male".',
    },
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = model('Product', productSchema);
