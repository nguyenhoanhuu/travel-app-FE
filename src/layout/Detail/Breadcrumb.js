import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const routes = [
   {
      path: 'index',
      breadcrumbName: 'home',
   },
   {
      path: 'first',
      breadcrumbName: 'first',
      children: [
         {
            path: '/general',
            breadcrumbName: 'General',
         },
         {
            path: '/layout',
            breadcrumbName: 'Layout',
         },
         {
            path: '/navigation',
            breadcrumbName: 'Navigation',
         },
      ],
   },
   {
      path: '/second',
      breadcrumbName: 'second',
   },
];
function itemRender(route, params, routes, paths) {
   const last = routes.indexOf(route) === routes.length - 1;
   return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}
function Test() {
   return <Breadcrumb itemRender={itemRender} routes={routes} />;
}

export default Test;
