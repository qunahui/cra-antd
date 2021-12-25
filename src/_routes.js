import React, { lazy } from 'react';
//
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));
const Page404 = lazy(() => import('./pages/notFound'));
//
const DashboardPage = lazy(() => import('./pages/dashboard'));
//User
const UsersPage = lazy(() => import('./pages/users'));
// Project
const ProjectsPage = lazy(() => import('./pages/projects'));
const ProjectPage = lazy(() => import('./pages/projects/[id]'));

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
    exact: true,
  },
  {
    path: '/users',
    component: UsersPage,
    exact: true,
  },
  {
    path: '/projects',
    component: ProjectsPage,
    exact: true,
  },
  {
    path: '/projects/:id',
    component: ProjectPage,
  },
  {
    path: '/404',
    component: Page404,
    exact: true,
    isPublic: true,
  },
];

export { routes };
