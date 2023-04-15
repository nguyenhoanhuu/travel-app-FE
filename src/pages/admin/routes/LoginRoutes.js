import { lazy } from 'react';

// project import
import Loadable from '~/pages/admin/components/Loadable';
import MinimalLayout from '~/pages/admin/layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('~/pages/admin/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('~/pages/admin/pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
   path: '/',
   element: <MinimalLayout />,
   children: [
      {
         path: 'login',
         element: <AuthLogin />,
      },
      {
         path: 'register',
         element: <AuthRegister />,
      },
   ],
};

export default LoginRoutes;
