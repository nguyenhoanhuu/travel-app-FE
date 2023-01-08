import classNames from 'classnames/bind';
import { filter as listFilter } from '~/routes/FilterRouter';
import styles from '~/component/FormFilterBooking/FormFilterBooking.module.scss';
import { useState, useEffect } from 'react';
import FilterBox from './FilterBox/FilterBox';
const cx = classNames.bind(styles);

function FormFilterBooking() {
   const [filterBoxId, setFilterBoxId] = useState(1);
   const [result, setResult] = useState(listFilter[filterBoxId]);
   useEffect(() => {
      setResult(listFilter[filterBoxId - 1]);
   }, [filterBoxId]);
   return (
      <div className={cx('filter-Box')}>
         <div className={cx('list-btn')}>
            {listFilter.map((filter) => {
               let isSelected = false;
               if (filter.id === filterBoxId) {
                  isSelected = true;
               }
               return (
                  <button
                     key={filter.id}
                     className={cx('filter-item', { selected: isSelected })}
                     onClick={() => setFilterBoxId(filter.id)}
                  >
                     <div className={cx('filter-infor')}>
                        <div className={cx('filter-icon')}>{filter.icon}</div>
                        <div className={cx('filter-item-name')}>{filter.name}</div>
                     </div>
                  </button>
               );
            })}
         </div>
         <FilterBox>{result.component}</FilterBox>
      </div>
   );
}

export default FormFilterBooking;
