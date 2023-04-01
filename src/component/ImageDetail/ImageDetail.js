import classNames from 'classnames/bind';
import style from '~/component/ImageDetail/ImageDetail.module.scss';
import Image from '../Image/Image';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCaretRight, faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

const lstImage = [
   'https://media.travel.com.vn/tour/tfd_220404030907_309719.jpg',
   'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg',
   'https://media.travel.com.vn/tour/tfd_220620111828_289122.jpg',
   'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg',
];
function ImageDetail({ listImage = lstImage }) {
   return (
      <div className={cx('wrapper')}>
         {window.innerWidth >= 560 ? (
            <div className={cx('list-item')}>
               <div className={cx('list-item-1')}>
                  <Image
                     src={'https://media.travel.com.vn/tour/tfd_220404030907_309719.jpg'}
                     className={cx('image')}
                  ></Image>
               </div>
               <div className={cx('list-item-2')}>
                  <div className={cx('sub-item-1')}>
                     <Image
                        src={'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg'}
                        className={cx('image')}
                     ></Image>
                     <Image
                        src={'https://media.travel.com.vn/tour/tfd_220620111828_289122.jpg'}
                        className={cx('image')}
                     ></Image>
                  </div>
                  <div className={cx('sub-item-2')}>
                     <Image
                        src={'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg'}
                        className={cx('image')}
                     ></Image>
                  </div>
               </div>
            </div>
         ) : (
            <Carousel
               arrows
               nextArrow={<FontAwesomeIcon icon={faCaretSquareRight} />}
               prevArrow={<FontAwesomeIcon icon={faCaretSquareLeft} />}
            >
               {listImage.map((item, index) => {
                  return <Image key={index} src={item} className={cx('image')}></Image>;
               })}
            </Carousel>
         )}
      </div>
   );
}

export default ImageDetail;
