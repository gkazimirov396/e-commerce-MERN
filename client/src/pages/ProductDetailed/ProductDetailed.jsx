import { useState } from 'react';

import { Divider, InputNumber, Typography, Button, Image } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import { useAddToCartMutation } from '@store/api/cartApi';
import { useFetchSingleProductQuery } from '@store/api/productsApi';
import { selectIsLoggedIn } from '@store/authSlice';

import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

import './ProductDetailed.scss';

const ProductDetailed = () => {
  const { productId } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useFetchSingleProductQuery(productId);

  const [addToCart] = useAddToCartMutation();

  const { imageUrl, title, price, description } = product ?? {};

  const totalPrice = quantity * price;

  const addToCartHandler = () => {
    addToCart({
      id: product?._id,
      quantity: quantity || 1,
    });
  };

  return (
    <>
      <Helmet>
        <title>Product {productId}</title>
      </Helmet>

      {isLoading && <LoadingSpinner />}
      {isError && <Navigate to="/404" />}
      {isSuccess && (
        <section className="product--detailed">
          <div className="product--detailed__left">
            <Image
              className="left__image"
              src={imageUrl}
              height={570}
              width={570}
              alt={title}
            />
            <div className="left__info">
              <Typography.Title className="left__name" level={3}>
                {title}
              </Typography.Title>
              <Typography.Text strong>{`$${price}`}</Typography.Text>
              <Divider />
              <Typography.Paragraph>{description}</Typography.Paragraph>
            </div>
          </div>
          {isLoggedIn && (
            <div className="product--detailed__right">
              <div className="right__info">
                <Typography.Text>
                  Total: <span>${totalPrice.toFixed(2)}</span>
                </Typography.Text>
                <Divider />
                <Typography.Text>
                  Qty:
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={1}
                    value={quantity}
                    onChange={value => setQuantity(value)}
                  />
                </Typography.Text>
                <Button type="secondary" onClick={addToCartHandler}>
                  Add To Cart
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ProductDetailed;
