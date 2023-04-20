import classNames from 'classnames/bind';
import styles from '~/component/PointOfDepartureFavorite/PointOfDepartureFavorite.module.scss';
import PointOfDepartureFavoriteItem from './PointOfDepartureFavoriteItem/PointOfDepartureFavoriteItem';
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import * as GetTour from '~/service/GetTour';
const cx = classNames.bind(styles);
function PointOfDepartureFavorite() {
   const [listDeparture, setListDeparture] = useState([]);
   const showListPoint = (listDeparture) => {
      return listDeparture.map((item, index) => {
         return <PointOfDepartureFavoriteItem key={index} data={item}></PointOfDepartureFavoriteItem>;
      });
   };
   useEffect(() => {
      GetTour.search('tours/top8', 'favoritedestination')
         .then((data) => setListDeparture(data))
         .catch((error) => console.log(error));
   }, []);
   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('title')}>Điểm đến yêu thích</h2>
         {/* <div className={cx('list-item')}>{showListPoint()}</div> */}

         {window.innerWidth <= 680 ? (
            <Carousel>{showListPoint(listDeparture)}</Carousel>
         ) : (
            <div className={cx('list-item')}>{showListPoint(listDeparture)}</div>
         )}
      </div>
   );
}

export default PointOfDepartureFavorite;
