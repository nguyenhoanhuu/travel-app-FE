import FormFilterBooking from '~/component/FormFilterBooking/FormFilterBooking';
import PointOfDepartureFavorite from '~/component/PointOfDepartureFavorite/PointOfDepartureFavorite';
import SliderShow from '~/component/SliderShow/SliderShow';
import TourCard from '~/component/TourCard/TourCard.js';
import WhyChoicePage from '~/component/WhyChoicePage/WhyChoicePage';
import styles from '~/layout/Home/Home.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Home() {
   return (
      <>
         <div className={cx('container')}>
            <FormFilterBooking> </FormFilterBooking>
            <SliderShow />
            <TourCard />
            <PointOfDepartureFavorite></PointOfDepartureFavorite>
            <WhyChoicePage></WhyChoicePage>
         </div>
         <footer className={cx('footer')}></footer>
      </>
   );
}

export default Home;
