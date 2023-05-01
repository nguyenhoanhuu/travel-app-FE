import classNames from 'classnames/bind';
import styles from '~/component/TourCard/TourCard.module.scss';
import TourCardItem from './TourCardItem/TourCardItem';
import { Carousel } from 'antd';
import '~/component/TourCard/TourCard.css';
const cx = classNames.bind(styles);

function TouCard({ title = 'Ưu đãi tour giờ chót', data, className, numTour = 3, isSmall, shortenCard }) {
   const showListTourCard = () => {
      return data.map((item, index) => {
         return (
            <TourCardItem
               key={index}
               numberCard={numTour}
               data={item}
               isSmall={isSmall}
               shortenCard={shortenCard}
            ></TourCardItem>
         );
      });
   };
   return (
      <div className={cx('wrapper')}>
         {title && <h2 className={cx('title', className)}>{title}</h2>}
         {window.innerWidth <= 908 && isSmall !== true ? (
            <Carousel>{showListTourCard()}</Carousel>
         ) : (
            <div className={cx('list-card-tour')}>{showListTourCard()}</div>
         )}
      </div>
   );
}

export default TouCard;
