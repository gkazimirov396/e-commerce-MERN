import { Button, Result } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <>
      <Helmet>
        <title>Forbidden</title>
      </Helmet>

      <Result
        status="403"
        title="This page is forbidden."
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to="/" replace>
              Go To Home Page
            </Link>
          </Button>
        }
      />
    </>
  );
};

export default Forbidden;
