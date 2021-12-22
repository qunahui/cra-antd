import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

const Page404 = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist or you dont have permission to access !"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default Page404;
