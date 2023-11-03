import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import './CategoryItem.scss';

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <li className="categories__item">
      <img src={item.img} alt={item.title} />
      <div className="info">
        <Typography.Title level={5} className="title">
          {item.title}
        </Typography.Title>
        <button onClick={() => navigate('/products')}>SHOP NOW</button>
      </div>
    </li>
  );
};

export default CategoryItem;
