import classNames from 'classnames/bind';
import styles from '~/component/FormFilterBooking/FormSearch/FormSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarDays, faLocationDot, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { format } from 'date-fns';
import { data as DataTinhTP } from '~/assets/data/tinh-tp';

const cx = classNames.bind(styles);
function FormSearch({ typeTour }) {
   const [openCalendar, setOpenCalendar] = useState(false);
   const [departure, setDeparture] = useState('Thành phố Hồ Chí Minh');
   const [destination, setDestination] = useState('Thành phố Hồ Chí Minh');
   const [dates, setDates] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: 'selection',
      },
   ]);
   const formSelectorDeparture = () => {
      return (
         <div className={cx('form-selector')}>
            {DataTinhTP.map((item) => {
               return (
                  <div
                     key={item.code}
                     className={cx('form-selector-item')}
                     onClick={() => setDeparture(item.name_with_type)}
                  >
                     {item.name_with_type}
                  </div>
               );
            })}
         </div>
      );
   };
   const formSelectorDestination = () => {
      return (
         <div className={cx('form-selector')}>
            {DataTinhTP.map((item) => {
               return (
                  <div
                     key={item.code}
                     className={cx('form-selector-item')}
                     onClick={() => setDestination(item.name_with_type)}
                  >
                     {item.name_with_type}
                  </div>
               );
            })}
         </div>
      );
   };
   const showCalendar = () => {
      return (
         <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            minDate={new Date()}
         />
      );
   };
   return (
      <div className={cx('wrapper')}>
         <Tippy render={formSelectorDeparture} interactive placement="bottom-end" offset={[-20, 10]}>
            <div className={cx('point-of-departure-space')}>
               <FontAwesomeIcon className={cx('icon')} size="2x" icon={faLocationDot}></FontAwesomeIcon>
               <div className={cx('infor')}>
                  <p className={cx('name')}>Điểm Đi</p>
                  <p className={cx('value')}>{departure}</p>
               </div>
            </div>
         </Tippy>
         <div>
            <FontAwesomeIcon className={cx('icon')} size="2x" icon={faRepeat}></FontAwesomeIcon>
         </div>
         <Tippy render={formSelectorDestination} interactive placement="bottom-end" offset={[-20, 10]}>
            <div className={cx('destination-space')}>
               <FontAwesomeIcon className={cx('icon')} size="2x" icon={faLocationDot}></FontAwesomeIcon>

               <div className={cx('infor')}>
                  <p className={cx('name')}>Điểm Đến</p>
                  <div className={cx('value')}>{destination}</div>
               </div>
            </div>
         </Tippy>
         <Tippy render={showCalendar} placement="bottom-start" visible={openCalendar} interactive>
            <div className={cx('date-of-departure-destination')} onClick={() => setOpenCalendar(!openCalendar)}>
               <FontAwesomeIcon icon={faCalendarDays} size="2x" className={cx('icon')} />
               <div className={cx('infor')}>
                  <p className={cx('name')}>Thời gian</p>
                  <span className={cx('value')}>
                     {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}
                  </span>
               </div>
            </div>
         </Tippy>
         <div className={cx('btn-submit')}>
            <FontAwesomeIcon icon={faArrowRight} size="4x" />
         </div>
      </div>
   );
}

export default FormSearch;
