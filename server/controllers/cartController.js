import fs from 'node:fs';
import path from 'node:path';

import MailGen from 'mailgen';
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

import { sendMail } from '../utils/sendMail.js';
import { __dirname } from '../utils/url.js';

const getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.productId');

    const cart = user.cart.map(item => ({
      ...item.productId._doc,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    }));

    res.json(cart);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  const id = req.params.id;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Could not find product.');
      error.status = 404;
      throw error;
    }

    const totalPrice = product.price * quantity;

    const result = await req.user.addToCart({
      productId: product._id,
      quantity: quantity || 1,
      totalPrice: totalPrice || product.price,
    });

    res.status(201).json(result);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

const removeFromCart = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Could not find product.');
      error.status = 404;
      throw error;
    }

    // TODO: add logic to remove item completely

    const result = await req.user.removeFromCart(product._id);

    res.status(200).json(result);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

const checkoutCart = async (req, res, next) => {
  const { phoneNumber, address } = req.body;

  try {
    const pdfDoc = new PDFDocument();
    const mailGenerator = new MailGen({
      theme: 'default',
      product: {
        name: 'KaziShops',
        link: 'http://localhost:3000',
      },
    });

    const user = req.user;
    const totalAmount = user.cart.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const newOrder = await Order.create({
      userId: user._id,
      products: user.cart,
      totalAmount,
      phoneNumber,
      address,
    });
    const order = await newOrder.populate('products.productId');

    const invoiceName = `invoice-${order._id}.pdf`;
    const invoicePath = path.resolve(
      __dirname,
      `../data/orders/${invoiceName}`
    );
    const orderDate = format(order.createdAt, 'PPPppp');

    pdfDoc.pipe(fs.createWriteStream(invoicePath));

    pdfDoc
      .fontSize(26)
      .text(`Invoice-${order._id}`, { underline: true, paragraphGap: 3 });
    pdfDoc.fontSize(11).text(`Created At: ${orderDate}`);
    pdfDoc.fontSize(16).text('-------------------', { paragraphGap: 8 });

    order.products.forEach(product => {
      pdfDoc
        .fontSize(14)
        .text(
          `${product.productId.title} - ${
            product.quantity
          }x - $${product.totalPrice.toFixed(2)}`
        );
    });

    pdfDoc.fontSize(16).text('-------------------', { paragraphGap: 8 });
    pdfDoc.fontSize(20).text(`Total Amount: $${order.totalAmount.toFixed(2)}`);

    pdfDoc.end();

    await user.clearCart();

    const emailBody = mailGenerator.generate({
      body: {
        name: user.name,
        intro: 'We are glad you chose our services.',
        action: {
          instructions: 'To get your order information, please click here:',
          button: {
            color: '#7fd1ae',
            text: 'Download Order Data',
            link: `${req.protocol}://${req.get('host')}/orders/${invoiceName}`,
          },
        },
        outro:
          'Need help, or have questions? Just reply to this email, and our support team will contact you.',
      },
    });

    const result = await sendMail(process.env.FROM_EMAIL, emailBody);

    res.status(201).json(result);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export default {
  getCart,
  addToCart,
  checkoutCart,
  removeFromCart,
};
