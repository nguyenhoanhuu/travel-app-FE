import classNames from 'classnames/bind';
import styles from '~/component/PointOfDepartureFavorite/PointOfDepartureFavorite.module.scss';
import PointOfDepartureFavoriteItem from './PointOfDepartureFavoriteItem/PointOfDepartureFavoriteItem';
const cx = classNames.bind(styles);
function PointOfDepartureFavorite() {
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('title')}>Điểm đến yêu thích</h2>
         <div className={cx('list-item')}>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
            <PointOfDepartureFavoriteItem></PointOfDepartureFavoriteItem>
         </div>
      </div>
   );
}

export default PointOfDepartureFavorite;
