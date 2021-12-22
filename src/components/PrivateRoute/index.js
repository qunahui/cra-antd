import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/auth';

const PrivateRoute = ({ component: Component, isPublic = false, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isPublic || isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={'/login'} />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
