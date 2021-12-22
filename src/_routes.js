import React, { lazy } from 'react';

const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));
const Page404 = lazy(() => import('./pages/notFound'));
//
const DashboardPage = lazy(() => import('./pages/dashboard'));

const routes = [
  {
    path: '/',
    component: LoginPage,
    exact: true,
    isPublic: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    exact: true,
    isPublic: true,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    path: '/404',
    component: Page404,
    exact: true,
    isPublic: true,
  },
];

export { routes };
