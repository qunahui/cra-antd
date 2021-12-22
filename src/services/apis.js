import { graphQLClient } from './graphqlClient';
import { gql } from 'graphql-request';

const serializeRequest = (request) => {
  return request
    .then((res) => res)
    .catch((error) => {
      const errors = error.response.errors;
      return Promise.reject({
        status: errors?.[0]?.extensions?.response?.statusCode,
        message: errors?.[0].message,
      });
    });
};

export const loginApi = (params) =>
  serializeRequest(
    graphQLClient.request(
      gql`
        mutation login($params: LoginDto!) {
          login(loginUser: $params) {
            accessToken
          }
        }
      `,
      {
        params,
      }
    )
  );

export const registerApi = (params) =>
  serializeRequest(
    graphQLClient.request(
      gql`
        mutation register($params: RegisterDto!) {
          register(registerUser: $params) {
            email
            username
          }
        }
      `,
      {
        params,
      }
    )
  );

export const whoAmI = () =>
  serializeRequest(
    graphQLClient.request(gql`
      {
        getProfile {
          id
          username
          email
        }
      }
    `)
  );
