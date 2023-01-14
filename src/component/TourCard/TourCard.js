import classNames from 'classnames/bind';
import styles from '~/component/TourCard/TourCard.module.scss';
import TourCardItem from './TourCardItem/TourCardItem';

const cx = classNames.bind(styles);

function TouCard() {
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('title')}>Ưu đãi tour giờ chót</h2>
         <div className={cx('list-card-tour')}>
            <TourCardItem></TourCardItem>
            <TourCardItem></TourCardItem>
            <TourCardItem></TourCardItem>
         </div>
      </div>
   );
}

export default TouCard;
