import {
  EnvironmentFilled,
  FacebookFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneFilled,
  SlackOutlined,
  TwitterCircleFilled,
} from '@ant-design/icons';
import { Layout, Typography } from 'antd';

import logo from '@assets/img/logo.png';

import './Footer.scss';

const Footer = () => {
  return (
    <Layout.Footer className="footer">
      <div className="footer__left">
        <img className="footer__logo" src={logo} alt="LOGO" />
        <Typography.Paragraph className="footer__description">
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don’t look even slightly believable.
        </Typography.Paragraph>
        <div>
          <FacebookFilled className="social-icon-fb" />
          <InstagramOutlined className="social-icon-inst" />
          <TwitterCircleFilled className="social-icon-twitter" />
          <SlackOutlined className="social-icon-slack" />
        </div>
      </div>
      <div className="footer__center">
        <Typography.Title level={5} className="footer__title">
          Useful Links
        </Typography.Title>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Man Fashion</li>
          <li>Woman Fashion</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Wishlist</li>
          <li>Wishlist</li>
          <li>Terms</li>
        </ul>
      </div>
      <div className="footer__right">
        <Typography.Title level={5} className="footer__title">
          Contact
        </Typography.Title>
        <Typography.Paragraph>
          <EnvironmentFilled className="footer__contact-item" /> 622 Dixie Path ,
          South Tobinchester 98336
        </Typography.Paragraph>
        <Typography.Paragraph>
          <PhoneFilled className="footer__contact-item" /> +1 234 56 78
        </Typography.Paragraph>
        <Typography.Paragraph>
          <MailOutlined className="footer__contact-item" />
          kazi-shops@gmail.com
        </Typography.Paragraph>
        <img
          className="footer__payments"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
        />
      </div>
    </Layout.Footer>
  );
};

export default Footer;
