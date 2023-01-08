import classNames from 'classnames/bind';
import styles from '~/component/SliderShow/SliderShow.module.scss';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '~/component/SliderShow/SliderShow.css';

const cx = classNames.bind(styles);
const sampleData = [
   {
      id: 1,
      image: 'https://media.travel.com.vn/Advertisings/bn_230104_Banner_AFF%20cup%202022_BanKet1024-768px.jpg',
      link: '',
   },
   {
      id: 2,
      image: 'https://media.travel.com.vn/Advertisings/bn_221230_3_1672364241.jpg',
      link: '',
   },
   {
      id: 3,
      image: 'https://media.travel.com.vn/Advertisings/bn_230104_Banner_AFF%20cup%202022_BanKet1024-768px.jpg',
      link: '',
   },
   {
      id: 4,
      image: 'https://media.travel.com.vn/Advertisings/bn_221230_3_1672364241.jpg',
      link: '',
   },
   {
      id: 5,
      image: 'https://media.travel.com.vn/Advertisings/bn_230104_Banner_AFF%20cup%202022_BanKet1024-768px.jpg',
      link: '',
   },
];
function SliderShow({ data = sampleData, componentSliderShow }) {
   const showindicators = () => {
      return (
         <div className="indicator">
            <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
         </div>
      );
   };
   const attribute = {
      duration: 2000,
      transitionDuration: 500,
      infinite: true,
      // arrow: true,
      slidesToScroll: 1,
      slidesToShow: 3,
   };

   return (
      <div className={cx('wrapper')}>
         <h2 className={cx('title')}>Ưu đãi</h2>

         <Slide {...attribute} indicators={showindicators}>
            {data.map((item) => {
               return (
                  <div key={item.id} className="each-slide">
                     <div>
                        <img src={item.image} alt="img1" />
                     </div>
                  </div>
               );
            })}
         </Slide>
      </div>
   );
}

export default SliderShow;
