import { lazy } from 'react';

// project import
import Loadable from '~/pages/admin/components/Loadable';
import MainLayout from '~/pages/admin/layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('~/pages/admin/pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('~/pages/admin/pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('~/pages/admin/pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('~/pages/admin/pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('~/pages/admin/pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('~/pages/admin/pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
   path: '/',
   element: <MainLayout />,
   children: [
      {
         path: '/',
         element: <DashboardDefault />,
      },
      {
         path: 'color',
         element: <Color />,
      },
      {
         path: 'dashboard',
         children: [
            {
               path: 'default',
               element: <DashboardDefault />,
            },
         ],
      },
      {
         path: 'sample-page',
         element: <SamplePage />,
      },
      {
         path: 'shadow',
         element: <Shadow />,
      },
      {
         path: 'typography',
         element: <Typography />,
      },
      {
         path: 'icons/ant',
         element: <AntIcons />,
      },
   ],
};

export default MainRoutes;
