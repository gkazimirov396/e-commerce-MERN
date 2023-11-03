import { DeleteOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from '@store/api/cartApi';

import './CartItem.scss';

const CartItem = ({ imageUrl, id, quantity, title, price }) => {
  const [removeFromCart] = useRemoveFromCartMutation();
  const [addToCart] = useAddToCartMutation();

  const addToCartHandler = () => {
    addToCart({ id });
  };

  const removeFromCartHandler = () => {
    removeFromCart(id);
  };
  // NOTE: change cart item design?
  return (
    <li className="cart__card">
      {/* FIXME: improve design on responsive screens */}
      <img className="cart__card__image" src={imageUrl} alt={title} />
      <Typography.Title level={3} className="cart__card__name">
        {title}
      </Typography.Title>
      <Typography.Text strong className="cart__card__price">
        ${price.toFixed(2)}
      </Typography.Text>
      <div>
        <Button size="small" type="text" onClick={removeFromCartHandler}>
          -
        </Button>
        <Typography.Text>{quantity}</Typography.Text>
        <Button size="small" type="text" onClick={addToCartHandler}>
          +
        </Button>
      </div>
      <Button
        danger
        type="primary"
        onClick={removeFromCartHandler}
        className="cart__card__deleteBtn"
      >
        <DeleteOutlined />
      </Button>
    </li>
  );
};

export default CartItem;
