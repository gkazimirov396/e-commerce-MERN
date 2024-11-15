import { useMemo } from 'react';

import { Col, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { useFetchProductsQuery } from '@store/api/productsApi';

import { useErrorHandler } from '@hooks/useErrorHandler';

import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import Product from '@components/ProductCard/ProductCard';

import './ProductsList.scss';

const ProductsList = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const productQuery = searchParams.get('prod') ?? '';

  const {
    data: products,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useFetchProductsQuery(category);

  useErrorHandler(isError ? error : null);

  const filteredProducts = useMemo(
    () =>
      (products ?? []).filter(p =>
        p.title.trim().toLowerCase().includes(productQuery.toLowerCase())
      ),
    [productQuery, products]
  );

  return (
    <>
      <Helmet>
        <title>{category.toUpperCase() || ''} Products</title>
      </Helmet>

      <section className="products">
        {isLoading && <LoadingSpinner />}
        {isSuccess && (
          <>
            <Typography.Title level={2} className="products__title">
              Products ({category || 'all'})
            </Typography.Title>
            <ul>
              <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                {filteredProducts.map(product => (
                  <Col sm={10} md={8} lg={5} xl={4} key={product._id}>
                    <Product
                      id={product._id}
                      price={product.price}
                      title={product.title}
                      imageUrl={product.imageUrl}
                    />
                  </Col>
                ))}
              </Row>
            </ul>
          </>
        )}
      </section>
    </>
  );
};

export default ProductsList;
