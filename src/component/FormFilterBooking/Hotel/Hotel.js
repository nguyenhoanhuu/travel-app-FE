import {
   faHotel,
   faLocationDot,
   faCalendarDays,
   faDoorOpen,
   faArrowRight,
   faIgloo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from '~/component/FormFilterBooking/Hotel/Hotel.module.scss';
import Tippy from '@tippyjs/react/headless';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
const cx = classNames.bind(styles);
function Hotel() {
   const [inforName, setInforName] = useState('');
   const [openCalendar, setOpenCalendar] = useState(false);
   const [numberOfRoom, SetNumberOfRoom] = useState(1);
   const [numberOfPassengers, setNumberOfPassengers] = useState({
      adult: 1,
      children: 2,
   });
   const [dates, setDates] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: 'selection',
      },
   ]);
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
   const showFormSelectPassengers = () => {
      return (
         <div className={cx('formSelector')}>
            <div className={cx('formSelector-title')}>
               <h3>Số người tham gia</h3>
            </div>
            <div className={cx('infor-adult')}>
               <div className={cx('quantity')}>
                  <button
                     className={cx('btn-subtract')}
                     onClick={() => {
                        if (numberOfPassengers.adult - 1 >= 1) {
                           setNumberOfPassengers({
                              adult: numberOfPassengers.adult - 1,
                              children: numberOfPassengers.children,
                           });
                        }
                     }}
                  >
                     -
                  </button>
                  <p className={cx('quantity-adult')}>{numberOfPassengers.adult}</p>
                  <button
                     className={cx('btn-add')}
                     onClick={() => {
                        setNumberOfPassengers({
                           adult: numberOfPassengers.adult + 1,
                           children: numberOfPassengers.children,
                        });
                     }}
                  >
                     +
                  </button>
               </div>
               <div className={cx('infor-adult-description')}>
                  <p className={cx('description')}>Người lớn</p>
                  <p className={cx('sub-description')}>Từ 12 tuổi trở lên</p>
               </div>
            </div>
            <div className={cx('infor-children')}>
               <div className={cx('quantity')}>
                  <button
                     className={cx('btn-subtract')}
                     onClick={() => {
                        if (numberOfPassengers.children - 1 >= 0) {
                           setNumberOfPassengers({
                              adult: numberOfPassengers.adult,
                              children: numberOfPassengers.children - 1,
                           });
                        }
                     }}
                  >
                     -
                  </button>
                  <p className={cx('quantity-children')}>{numberOfPassengers.children}</p>
                  <button
                     className={cx('btn-add')}
                     onClick={() => {
                        setNumberOfPassengers({
                           adult: numberOfPassengers.adult,
                           children: numberOfPassengers.children + 1,
                        });
                     }}
                  >
                     +
                  </button>
               </div>
               <div className={cx('infor-children-description')}>
                  <p className={cx('description')}>Trẻ em</p>
                  <p className={cx('sub-description')}>dưới 12 tuổi</p>
               </div>
            </div>
         </div>
      );
   };
   const showFormSelectRoom = () => {
      return (
         <div className={cx('formSelector')}>
            <div className={cx('formSelector-title')}>
               <h3>Số phòng</h3>
            </div>
            <div className={cx('infor-adult')}>
               <div className={cx('quantity')}>
                  <button
                     className={cx('btn-subtract')}
                     onClick={() => {
                        if (numberOfRoom - 1 >= 1) {
                           SetNumberOfRoom(numberOfRoom - 1);
                        }
                     }}
                  >
                     -
                  </button>
                  <p className={cx('quantity-adult')}>{numberOfRoom}</p>
                  <button
                     className={cx('btn-add')}
                     onClick={() => {
                        SetNumberOfRoom(numberOfRoom + 1);
                     }}
                  >
                     +
                  </button>
               </div>
               <div className={cx('infor-adult-description')}>
                  <p className={cx('description')}>Phòng</p>
               </div>
            </div>
         </div>
      );
   };
   return (
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>
            <p className={cx('header-title')}>Khách Sạn</p>
            <div className={cx('header-line')}></div>
         </div>
         <div className={cx('content')}>
            <div className={cx('content-info')}>
               <div className={cx('name-hotel-space')}>
                  <FontAwesomeIcon className={cx('icon')} size="2x" icon={faLocationDot}></FontAwesomeIcon>

                  <div className={cx('infor')}>
                     <p className={cx('name')}>Điểm đến hoặc tên khách sạn</p>
                     <input
                        type="text"
                        className={cx('value')}
                        value={inforName}
                        placeholder="Nhập điểm đến hoặc tên khách sạn"
                        onChange={(e) => {
                           setInforName(e.target.value);
                        }}
                     />
                  </div>
               </div>
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
            </div>
            <div className={cx('content-info')}>
               <Tippy
                  render={showFormSelectPassengers}
                  offset={[60, 15]}
                  interactive
                  placement="bottom-start"
                  duration={[100, 500]}
               >
                  <div className={cx('number-of-passengers')}>
                     <FontAwesomeIcon icon={faCalendarDays} size="2x" className={cx('icon')} />
                     <div className={cx('infor')}>
                        <p className={cx('name')}>Số người</p>
                        <p className={cx('value')}>
                           {numberOfPassengers.adult} Người lớn
                           {numberOfPassengers.children > 0 && `,${numberOfPassengers.children} trẻ em`}
                        </p>
                     </div>
                  </div>
               </Tippy>
               <Tippy
                  render={showFormSelectRoom}
                  offset={[60, 15]}
                  interactive
                  placement="bottom-start"
                  duration={[100, 500]}
               >
                  <div className={cx('number-of-room')}>
                     <FontAwesomeIcon icon={faDoorOpen} size="2x" className={cx('icon')} />
                     <div className={cx('infor')}>
                        <p className={cx('name')}>Số phòng</p>
                        <p className={cx('value')}>{numberOfRoom} Phòng</p>
                     </div>
                  </div>
               </Tippy>
               <div className={cx('btn-submit')}>
                  <FontAwesomeIcon className={cx('icon-btn-submit')} icon={faArrowRight} size="4x" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Hotel;
