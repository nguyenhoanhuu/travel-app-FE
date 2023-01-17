import classNames from 'classnames/bind';
import styles from '~/layout/DefaultLayout/DefaultLayout.module.scss';
import Header from '~/pages/Header/Header';
import images from '~/assets/image';
import FormFilterBooking from '~/component/FormFilterBooking/FormFilterBooking';
import SliderShow from '~/component/SliderShow/SliderShow';
import TourCard from '~/component/TourCard/TourCard';
import PointOfDepartureFavorite from '~/component/PointOfDepartureFavorite/PointOfDepartureFavorite';
import WhyChoicePage from './../../component/WhyChoicePage/WhyChoicePage';

function DefaultLayout({ children }) {
   const cx = classNames.bind(styles);
   return (
      <div className={cx('wrapper')}>
         <Header background={images.backgroundHeader}></Header>

         <div className={cx('container')}>
            <FormFilterBooking> </FormFilterBooking>
            <SliderShow />
            <TourCard />
            <PointOfDepartureFavorite></PointOfDepartureFavorite>
         </div>
         <footer className={cx('footer')}>
            <WhyChoicePage></WhyChoicePage>
         </footer>
      </div>
   );
}

export default DefaultLayout;
