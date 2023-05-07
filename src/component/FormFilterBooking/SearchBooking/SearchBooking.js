import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/component/FormFilterBooking/SearchBooking/SearchBooking.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as GetTour from '~/service/GetTour';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SearchBooking() {
   const navigate = useNavigate();
   const [selectTypeTour, setSelectTypeTour] = useState(false);
   const [inforBooking, SetInforBooking] = useState();
   const [idTour, setIdTour] = useState();
   const key = 'updatable';
   const [messageApi, contextHolder] = message.useMessage();
   const getTourById = async () => {
      const header = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
         },
      };
      await GetTour.searchParamUrl('bookings/id', `bookingId=${idTour}`, header)
         .then((data) => {
            SetInforBooking(data.booking);
            console.log(data);
            messageApi.open({
               type: 'success',
               key,
               type: ' Tìm thành công ',
               content: data.message,
               duration: 2,
            });
            data.status && navigate(`/detailBooking/${idTour}`, { state: { data: data } });
         })
         .catch((error) => {
            SetInforBooking(error);
            messageApi.open({
               type: 'error',
               key,
               type: 'Tìm thất bại',
               content: error.message,
               duration: 2,
            });
         });
   };
   return (
      <div className={cx('wrapper')}>
         {contextHolder}
         <div className={cx('list-btn-type-tour')}>
            {/* <button
               className={cx('btn-type-tour', { selected: !selectTypeTour })}
               onClick={() => setSelectTypeTour(!selectTypeTour)}
            >
               Du lịch trọn gói/combo
            </button> */}
            <button
               className={cx('btn-type-tour', { selected: selectTypeTour })}
               onClick={() => setSelectTypeTour(!selectTypeTour)}
            >
               khách sạn
            </button>
         </div>
         <div className={cx('search-form')}>
            <div className={cx('search-booking')}>
               <input
                  className={cx('title-booking')}
                  type="text"
                  name="title-booking"
                  id=""
                  placeholder="Nhập số Booking của Quý khách"
                  value={idTour}
                  onChange={(e) => setIdTour(e.target.value)}
               />
            </div>
            <div className={cx('btn-submit')} onClick={() => getTourById()}>
               <FontAwesomeIcon className={cx('icon-btn-submit')} icon={faArrowRight} size="4x" />
            </div>
         </div>
      </div>
   );
}

export default SearchBooking;
