import classNames from 'classnames/bind';
import styles from '~/component/TourCard/TourCardItem/TourCardItem.module.scss';

import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

const backgroundInCard = () => {
   return (
      <div className={cx('infor-background')}>
         <img
            className={cx('image')}
            alt="example"
            src="https://media.travel.com.vn/LastMinute/lm_230103101302_622112.jpg"
         />
         <span className={cx('icon-favorite')}>
            <FontAwesomeIcon icon={faHeart} size="2x"></FontAwesomeIcon>
         </span>
         <span className={cx('tour-category')}>
            <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
            Giờ chót
         </span>
         <span className={cx('tour-rating')}>9.4</span>
         <div className={cx('tour-review')}>
            <h4 className={cx('tour-review-feedback')}>Tuyệt vời</h4>
            <p className={cx('tour-review-count')}>358 quan tâm</p>
         </div>
      </div>
   );
};
function TourCardItem() {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [widthCard, setWidthCard] = useState(420);

   const detectSize = () => {
      if (window.innerWidth < 900) {
         setWidthCard((windowWidth * 80) / 100);
      } else {
         setWidthCard(window.innerWidth / 3.6);
      }
      setWindowWidth(window.innerWidth);
   };
   useEffect(() => {
      detectSize();
      console.log(windowWidth);
   }, [windowWidth]);
   return (
      <div className={cx('wrapper')}>
         <Card hoverable style={{ width: widthCard }} cover={backgroundInCard()}>
            {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
            <div className={cx('card-body')}>
               <div className={cx('header-tour')}>
                  <div className={cx('start-day')}>12/01/2023 - 4 ngày</div>
                  <div className={cx('name-tour')}> Quy Nhơn - Eo Gió - Phú Yên - Gành Đá Dĩa</div>
               </div>
               <div className={cx('body-tour')}>
                  <div>
                     <label htmlFor="tourId">Mã tour:</label>
                     <div className={cx('tour-id')}>
                        <FontAwesomeIcon icon={faTicket}></FontAwesomeIcon>
                        <p>NDSGN591-053-120123VU-V-F-1</p>
                     </div>
                  </div>
                  <div className={cx('point-of-departure')}>
                     <label htmlFor="pointOfDeparture">Nơi khởi hành:</label>
                     <p>TP. Hồ Chí Minh</p>
                  </div>
                  <div>
                     <label htmlFor="costOriginal">Giá: </label>
                     <s name="costOriginal">7,190,000₫</s>
                  </div>
                  <div className={cx('cost-current')}>
                     <span className={cx('cost-current-number')}>6,890,000₫</span>
                     <span className={cx('discount-percent')}>4% GIẢM</span>
                  </div>
                  <div className={cx('cost-current-timer')}>
                     <span>Còn 01 ngày 17:38:14</span>
                  </div>
                  <div>
                     <span className={cx('slot')}>
                        <u>Số chỗ còn</u>
                        <p className={cx('number-slot')}>4</p>
                     </span>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
}

export default TourCardItem;
