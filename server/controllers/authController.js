import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';

const handleSignup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      cart: [],
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

const handleLogin = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    const token = jwt.sign(
      {
        username: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(201).json({ token });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export default { handleSignup, handleLogin };
