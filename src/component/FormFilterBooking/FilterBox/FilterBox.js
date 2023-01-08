import classNames from 'classnames/bind';
import styles from '~/component/FormFilterBooking/FilterBox/FilterBox.module.scss';

const cx = classNames.bind(styles);
function FilterBox({ children }) {
   const Component = children;
   return (
      <div className={cx('wrapper')}>
         <Component></Component>
      </div>
   );
}

export default FilterBox;
