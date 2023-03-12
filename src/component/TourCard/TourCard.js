import classNames from 'classnames/bind';
import styles from '~/component/TourCard/TourCard.module.scss';
import TourCardItem from './TourCardItem/TourCardItem';

const cx = classNames.bind(styles);

function TouCard({ title = 'Ưu đãi tour giờ chót', data, className, numTour = 3, isSmall, shortenCard }) {
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('title', className)}>{title}</h2>
         <div className={cx('list-card-tour')}>
            {data.map((item, index) => {
               return (
                  <TourCardItem
                     key={index}
                     numberCard={numTour}
                     data={item}
                     isSmall={isSmall}
                     shortenCard={shortenCard}
                  ></TourCardItem>
               );
            })}
         </div>
      </div>
   );
}

export default TouCard;
