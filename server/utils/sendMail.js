import nodemailer from 'nodemailer';

export const sendMail = (email, body) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.USER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter.sendMail({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Get your order info.',
    html: body,
  });
};
