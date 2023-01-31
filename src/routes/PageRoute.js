import config from '~/Config';
import Home from '~/layout/Home/Home';
import Login from '~/layout/Login/Login';
import SignUp from '~/layout/SignUp/SignUp';
const publicRouter = [
   {
      path: config.routes.home,
      component: Home,
      background: true,
   },
   {
      path: config.routes.login,
      component: Login,
   },
   {
      path: config.routes.signup,
      component: SignUp,
   },
];
const privateLayout = [];
export { publicRouter, privateLayout };
