import { useMemo, useState } from 'react';

import { Button, Col, Empty, Form, message, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { useFetchCartQuery, useCheckoutCartMutation } from '@store/api/cartApi';

import { useErrorHandler } from '@hooks/useErrorHandler';

import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

import CartItem from './components/CartItem/CartItem';
import CartModal from './components/CartModal/CartModal';

import './Cart.scss';

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, ToastContainer] = message.useMessage();
  const [form] = Form.useForm();

  const {
    data: cart,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useFetchCartQuery();

  const [checkoutCart] = useCheckoutCartMutation();

  useErrorHandler(isError ? error : null);

  const isCartEmpty = cart?.length === 0;
  const totalPrice = useMemo(
    () => (cart ?? []).reduce((acc, item) => acc + item.totalPrice, 0),
    [cart]
  );

  const showModalHandler = () => {
    setIsModalOpen(isCartEmpty ? false : true);
  };

  const orderHandler = formData => {
    console.log(formData);

    form.resetFields();
    setIsModalOpen(false);

    toast
      .loading('Processing your order...', 2.5)
      .then(() => checkoutCart(formData).unwrap())
      .then(
        () => message.success('Your order was submitted succesfully', 1.4),
        error => {
          console.error(error);
          message.error('Your order failed to submit', 1.4);
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>

      <section className="cart">
        {ToastContainer}
        {isLoading && <LoadingSpinner />}
        {isSuccess && (
          <div className="cart__left">
            <Typography.Title level={2}>Shopping Cart</Typography.Title>
            <ul>
              {isCartEmpty ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Cart Is Empty"
                  imageStyle={{ height: 60 }}
                >
                  <Button type="primary">
                    <Link to="/products">Checkout Some Products</Link>
                  </Button>
                </Empty>
              ) : (
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                  {cart.map(item => (
                    <Col key={item._id}>
                      <CartItem
                        id={item._id}
                        title={item.title}
                        price={item.totalPrice}
                        quantity={item.quantity}
                        imageUrl={item.imageUrl}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </ul>
          </div>
        )}
        <div className="cart__right">
          <div className="cart__info">
            <Typography.Title level={4}>
              Total: <span>${totalPrice.toFixed(2)}</span>
            </Typography.Title>
          </div>
          <div>
            <Button
              type="secondary"
              onClick={showModalHandler}
              style={{ display: isCartEmpty ? 'none' : 'block' }}
            >
              Checkout
            </Button>
          </div>
        </div>

        <CartModal
          form={form}
          total={totalPrice}
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOk={() => {
            form.validateFields().then(orderHandler).catch(console.error);
          }}
        />
      </section>
    </>
  );
};

export default Cart;
