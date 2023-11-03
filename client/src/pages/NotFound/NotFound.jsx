import { Button, Space, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import './NotFound.scss';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>

      <div className="centered">
        <Space direction="vertical" size="middle">
          <div className="error">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>
          <Typography.Title level={2}>Page Not Found</Typography.Title>
          <Button type="primary">
            <Link to="/" replace>
              Go To Home Page
            </Link>
          </Button>
        </Space>
      </div>
    </>
  );
};

export default NotFound;
