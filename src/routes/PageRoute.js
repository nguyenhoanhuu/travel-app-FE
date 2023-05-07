import config from '~/Config';
import Detail from '~/layout/Detail/Detail';
import Home from '~/layout/Home/Home';
import Login from '~/layout/Login/Login';
import SignUp from '~/layout/SignUp/SignUp';
import TravelGuide from '~/layout/TravelGuide/TravelGuide';
import TravelNews from '~/layout/TravelNews/TravelNews';
import SearchPage from './../pages/SearchPage/SearchPage';
import BookingForm from './../pages/BookingForm/BookingForm';
import RequestTour from '~/pages/RequestTour/RequestTour';
import Payment from '~/layout/Payment/Payment';
import DetailBill from '~/component/DetailBill/DetailBill';
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
   {
      path: config.routes.requestTour,
      component: RequestTour,
   },
   {
      path: config.routes.payment,
      component: Payment,
   },
   {
      path: config.routes.detailBill,
      component: DetailBill,
   },
];

const privateLayout = [];
export { publicRouter, privateLayout };
