import React, { createContext, useState, useContext } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import { setToken } from 'src/services/graphqlClient';
import { loginApi, whoAmI } from 'src/services/apis';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const storagedUser = JSON.parse(Cookies.get('user') || '{}');
  const [user, setUser] = useState(storagedUser);
  const [loading, setLoading] = useState(false);

  const login = async (params) => {
    setLoading(true);
    try {
      const result = await loginApi(params);
      const token = result?.login?.accessToken;
      if (token) {
        Cookies.set('token', token, { expires: 60 });
        setToken(token);
        const data = await whoAmI();
        Cookies.set('user', JSON.stringify(data?.getProfile));
        setUser(data);
      }
      history.push('/dashboard');
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    history.push('/');
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !isEmpty(user), user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
