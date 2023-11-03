import { Helmet } from 'react-helmet-async';

import { categories } from '@data/categories';

import Carousel from '@components/Carousel/Carousel';
import CategoryItem from '@components/CategoryItem/CategoryItem';
import NewsLetter from '@components/NewsLetter/NewsLetter';

import './Home.scss';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <section className="home">
        <Carousel />
        <ul className="categories">
          {categories.map(item => (
            <CategoryItem key={item.id} item={item} />
          ))}
        </ul>
        <NewsLetter />
      </section>
    </>
  );
};

export default Home;
