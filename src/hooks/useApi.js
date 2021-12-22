import useSWR from 'swr';
import { graphQLClient } from 'src/services/graphqlClient';

const fetcher = (query, variables) => {
  return graphQLClient.request(query, variables);
};

const useApi = (query, variables) => {
  const response = useSWR([query, variables], fetcher);

  return response;
};

export default useApi;
