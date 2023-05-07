const routers = {
   home: '/',
   login: '/login',
   signup: '/signup',
   detail: '/detail/:tourId',
   travelNews: '/travel-news',
   travelGuide: '/travel-guide',
   searchPage: '/search-page',
   bookingTour: '/Booking/TourBooking/:tourId',
   requestTour: '/requestTour',
   payment: '/payment/:bookingId',
   detailBill: '/detailBooking/:bookingId',
};
export default routers;
