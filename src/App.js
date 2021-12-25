import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { Spin } from 'antd';
import DefaultLayout from './components/DefaultLayout';
import { whoAmI } from './services/apis';

const App = () => {
  useEffect(() => {
    whoAmI();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Switch>
          <Route
            path="/"
            render={(props) => (
              <AuthProvider>
                <DefaultLayout {...props} />
              </AuthProvider>
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
