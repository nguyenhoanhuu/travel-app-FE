import FormFilterBooking from '~/component/FormFilterBooking/FormFilterBooking';
import PointOfDepartureFavorite from '~/component/PointOfDepartureFavorite/PointOfDepartureFavorite';
import SliderShow from '~/component/SliderShow/SliderShow';
import TourCard from '~/component/TourCard/TourCard.js';
import WhyChoicePage from '~/component/WhyChoicePage/WhyChoicePage';
import styles from '~/layout/Home/Home.module.scss';

import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import * as GetTour from '~/service/GetTour';

const cx = classNames.bind(styles);
function Home() {
   const [listTour, setListTour] = useState([]);
   const fetchApi = async () => {
      // await GetTour.search('tours/top3', 'toexpire')
      await GetTour.search('tours/top', '3')

         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      fetchApi();
   }, []);
   return (
      <>
         <div className={cx('container')}>
            <FormFilterBooking> </FormFilterBooking>
            <SliderShow />
            <TourCard data={listTour} />
            <PointOfDepartureFavorite></PointOfDepartureFavorite>
            <WhyChoicePage></WhyChoicePage>
         </div>
      </>
   );
}

export default Home;
