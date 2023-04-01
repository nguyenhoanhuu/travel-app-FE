import classNames from 'classnames/bind';
import styles from '~/component/PointOfDepartureFavorite/PointOfDepartureFavorite.module.scss';
import PointOfDepartureFavoriteItem from './PointOfDepartureFavoriteItem/PointOfDepartureFavoriteItem';
import { Carousel } from 'antd';
const cx = classNames.bind(styles);
const showListPoint = () => {
   return Array.from({ length: 8 }).map((_, index) => {
      return <PointOfDepartureFavoriteItem key={index}></PointOfDepartureFavoriteItem>;
   });
};
function PointOfDepartureFavorite() {
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('title')}>Điểm đến yêu thích</h2>
         {/* <div className={cx('list-item')}>{showListPoint()}</div> */}

         {window.innerWidth <= 680 ? (
            <Carousel>{showListPoint()}</Carousel>
         ) : (
            <div className={cx('list-item')}>{showListPoint()}</div>
         )}
      </div>
   );
}

export default PointOfDepartureFavorite;
