import classNames from 'classnames/bind';
import styles from '~/component/FormFilterBooking/FullTour/FullTour.module.scss';
import { useState } from 'react';
import FormSearch from './../FormSearch/FormSearch';

const cx = classNames.bind(styles);
function FullTour() {
   // false is domestic and true id foreign
   const [selectTypeTour, setSelectTypeTour] = useState(false);
   const [activeType, settActiveType] = useState(1);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('list-btn-type-tour')}>
            <button
               className={cx('btn-type-tour', { selected: !selectTypeTour })}
               onClick={() => setSelectTypeTour(!selectTypeTour)}
            >
               Du lịch trong nước
            </button>
            <button
               className={cx('btn-type-tour', { selected: selectTypeTour })}
               onClick={() => setSelectTypeTour(!selectTypeTour)}
            >
               Du lịch nước ngoài
            </button>
         </div>
         <div className={cx('content-domestic', { disable: selectTypeTour })}>
            <div className={cx('content-type-tour')}>
               <button
                  className={cx('content-tour-btn', { active: activeType === 1 })}
                  onClick={() => settActiveType(1)}
               >
                  Tour Trọn Gói
               </button>
               <button
                  className={cx('content-tour-btn', { active: activeType === 2 })}
                  onClick={() => settActiveType(2)}
               >
                  Tour Gia Đình
               </button>
               {/* <Link to={'/tourXuyenViet'}> */}
               <button
                  className={cx('content-tour-btn', { active: activeType === 3 })}
                  onClick={() => settActiveType(3)}
               >
                  Tour Xuyên Việt
               </button>
               {/* </Link> */}
            </div>
            <FormSearch typeTour={activeType} />
         </div>

         <div className={cx('content-foreign', { disable: !selectTypeTour })}>
            <div className={cx('content-type-tour')}>
               <FormSearch></FormSearch>
            </div>
         </div>
      </div>
   );
}

export default FullTour;
