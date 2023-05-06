import FullTour from '~/component/FormFilterBooking/FullTour/FullTour';
import SearchBooking from './../component/FormFilterBooking/SearchBooking/SearchBooking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToriiGate, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const filter = [
   {
      id: 1,
      name: 'Tour Du Lịch Trọn Gói',
      icon: <FontAwesomeIcon icon={faToriiGate}></FontAwesomeIcon>,
      component: FullTour,
   },
   // {
   //    id: 2,
   //    name: 'Khách Sạn',
   //    icon: <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>,
   //    component: Hotel,
   // },
   {
      id: 2,
      name: 'Tra Cứu Booking',
      icon: <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>,
      component: SearchBooking,
   },
];

export { filter };
