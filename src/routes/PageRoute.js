import config from '~/Config';
import Detail from '~/layout/Detail/Detail';
import Home from '~/layout/Home/Home';
import Login from '~/layout/Login/Login';
import SignUp from '~/layout/SignUp/SignUp';
import TravelGuide from '~/layout/TravelGuide/TravelGuide';
import TravelNews from '~/layout/TravelNews/TravelNews';
import SearchPage from './../pages/SearchPage/SearchPage';
import BookingForm from './../pages/BookingForm/BookingForm';
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
   {
      path: config.routes.detail,
      component: Detail,
   },
   {
      path: config.routes.travelNews,
      component: TravelNews,
   },
   {
      path: config.routes.travelGuide,
      component: TravelGuide,
   },
   {
      path: config.routes.searchPage,
      component: SearchPage,
   },
   {
      path: config.routes.bookingTour,
      component: BookingForm,
   },
];

const privateLayout = [];
export { publicRouter, privateLayout };
