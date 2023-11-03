import { Card } from 'antd';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

const Product = props => {
  return (
    <li className="products__card">
      <Link to={`/products/${props.id}`}>
        <Card
          hoverable
          size="small"
          style={{ width: 250 }}
          cover={<img src={props.imageUrl} alt={props.title} />}
        >
          <Card.Meta title={props.title} description={`$${props.price}`} />
        </Card>
      </Link>
    </li>
  );
};

export default Product;
