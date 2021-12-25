import { graphQLClient } from './graphqlClient';
import Cookies from 'js-cookie';
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

// authentication
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

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  window.location.push('/');
  // window.location.reload();
};

//projects
export const createProject = (params) =>
  serializeRequest(
    graphQLClient.request(
      gql`
        mutation createProject($params: CreateProjectDto!) {
          createProject(project: $params) {
            id
            name
            type
            location
            area
            startDate
            endDate
          }
        }
      `,
      {
        params,
      }
    )
  );

export const getProject = (id) =>
  serializeRequest(
    graphQLClient.request(
      gql`
        query ($id: String!) {
          project(id: $id) {
            id
            type
            name
            location
            area
            startDate
            endDate
            groups {
              id
              name
              location
              area
              startDate
              endDate
              devices {
                name
                deviceSerial
              }
            }
          }
        }
      `,
      {
        id,
      }
    )
  );
