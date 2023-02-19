import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/component/FormFilterBooking/SearchBooking/SearchBooking.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function SearchBooking() {
   const [selectTypeTour, setSelectTypeTour] = useState(false);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('list-btn-type-tour')}>
            <button
               className={cx('btn-type-tour', { selected: !selectTypeTour })}
               onClick={() => setSelectTypeTour(!selectTypeTour)}
            >
               Du lịch trọn gói/combo
            </button>
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
               />
            </div>
            <div className={cx('btn-submit')}>
               <FontAwesomeIcon className={cx('icon-btn-submit')} icon={faArrowRight} size="4x" />
            </div>
         </div>
      </div>
   );
}

export default SearchBooking;
