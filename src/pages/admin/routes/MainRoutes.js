import { lazy } from 'react';

// project import
import Loadable from '~/pages/admin/components/Loadable';
import MainLayout from '~/pages/admin/layout/MainLayout';
import Option1 from './../pages/components-overview/Option1';
import Option2 from './../pages/components-overview/Option2';
import Option3 from '../pages/components-overview/Option3';
import Option4 from '../pages/components-overview/Option4';

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
         path: 'booking',
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
         path: 'voucher',
         element: <Shadow />,
      },
      {
         path: '/tour',
         element: <Typography />,
      },
      {
         path: 'promotion',
         element: <AntIcons />,
      },
      {
         path: 'requestTour',
         element: <Option1 />,
      },
      {
         path: 'tourGuide',
         element: <Option2 />,
      },
      {
         path: 'inforCustomer',
         element: <Option3 />,
      },
   ],
};

export default MainRoutes;
