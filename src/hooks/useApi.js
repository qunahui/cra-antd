import useSWR from 'swr';
import Cookies from 'js-cookie';
import { graphQLClient } from 'src/services/graphqlClient';
import { useAuth } from 'contexts/auth';

const fetcher = (query, variables) => {
  const token = Cookies.get('token');
  if (token) {
    graphQLClient.setHeader('Authorization', `Bearer ${token}`);
  }
  return graphQLClient.rawRequest(query, variables);
};

const useApi = (query, variables, options = {}) => {
  const { logout } = useAuth();

  let response = useSWR([query, variables], fetcher, {
    ...options,
    onError: (data) => {
      const statusCode =
        data.response.errors?.[0]?.extensions?.response?.statusCode;

      if (statusCode === 401) {
        logout();
      }

      return data;
    },
  });

  return response;
};

export default useApi;
