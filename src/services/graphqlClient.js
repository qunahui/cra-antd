import { GraphQLClient } from 'graphql-request';

const API_URL =
  process.env.APP_ENV === 'production'
    ? 'http://localhost:3003/graphql'
    : 'http://localhost:3003/graphql';

export const graphQLClient = new GraphQLClient(API_URL);

export const setToken = (token) => {
  graphQLClient.setHeader('authorization', `Bearer ${token}`);
};
