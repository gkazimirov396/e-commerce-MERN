import { Button, Result } from 'antd';
import { Helmet } from 'react-helmet-async';

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const errorMessage = error?.data?.message ?? error.message;

  return (
    <>
      <Helmet>
        <title>An Error Ocurred</title>
      </Helmet>

      <Result
        status="500"
        title="Oops! Something went wrong."
        subTitle={errorMessage}
        extra={
          <Button type="primary" onClick={resetErrorBoundary}>
            Refresh Page
          </Button>
        }
      />
    </>
  );
};

export default ErrorPage;
