import { useEffect, useMemo, useState } from 'react';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Grid } from 'antd';
import classNames from 'clsx';

import { useFetchCartQuery } from '@store/api/cartApi';

import './CartButton.scss';

const CartButton = () => {
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);
  const { xs, lg } = Grid.useBreakpoint();

  const { data: cart } = useFetchCartQuery();

  const buttonClasses = classNames('btn', { bump: btnIsAnimated });

  const totalQuantity = useMemo(
    () => (cart ?? []).reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  useEffect(() => {
    if (cart?.length === 0) return;
    setBtnIsAnimated(true);

    const timerId = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [cart]);

  return (
    <>
      {!lg && xs ? (
        <Badge count={totalQuantity}>
          <Button type="text" shape="circle" icon={<ShoppingCartOutlined />} />
        </Badge>
      ) : (
        <Button
          type="primary"
          className={buttonClasses}
          icon={<ShoppingCartOutlined />}
        >
          <span data-badge={totalQuantity}>Your Cart</span>
        </Button>
      )}
    </>
  );
};

export default CartButton;
