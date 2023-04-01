import classNames from 'classnames/bind';
import styles from '~/component/TourCard/TourCardItem/TourCardItem.module.scss';

import React from 'react';
import { Card, Image } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import vietnamLocate from 'date-fns/locale/vi';
const cx = classNames.bind(styles);

function TourCardItem({ data, isSmall, shortenCard = false }) {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [widthCard, setWidthCard] = useState(315);
   const divide = isSmall ? 5 : 3.6;
   const backgroundInCard = () => {
      return (
         <div className={cx('infor-background')}>
            <Image
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
               <p className={cx('tour-review-count')}>{data.liked} quan tâm</p>
            </div>
         </div>
      );
   };

   const detectSize = () => {
      if (window.innerWidth < 900) {
         setWidthCard((windowWidth * 80) / 100);
      } else {
         setWidthCard(window.innerWidth / divide);
      }
      setWindowWidth(window.innerWidth);
   };
   useEffect(() => {
      detectSize();
   }, []);

   return (
      <Card hoverable style={{ width: widthCard }} className={cx('tour-card')} cover={backgroundInCard()}>
         <div className={cx('card-body')}>
            <div className={cx('header-tour')}>
               <div className={cx('start-day')}>
                  {format(new Date(data.startDay), 'dd/MM/yyyy')} - {data.numberOfDay} ngày
               </div>
               <Link to={'/detail/' + data.id} className={cx('wrapper')}>
                  <div className={cx('name-tour')}>{data.name}</div>
               </Link>
            </div>
            <div className={cx('body-tour')}>
               {shortenCard === false && (
                  <div>
                     <label htmlFor="tourId">Mã tour:</label>
                     <div className={cx('tour-id')}>
                        <FontAwesomeIcon icon={faTicket}></FontAwesomeIcon>
                        <p>{data.id}</p>
                     </div>
                  </div>
               )}
               <div className={cx('point-of-departure')}>
                  <label htmlFor="pointOfDeparture">Nơi khởi hành:</label>
                  <p>{data.departure}</p>
               </div>
               {shortenCard === false && (
                  <div>
                     <label htmlFor="costOriginal">Giá: </label>
                     <s name="costOriginal">{data.price.toLocaleString()}₫</s>
                  </div>
               )}
               <div className={cx('cost-current')}>
                  <span className={cx('cost-current-number')}>
                     {data.promotionPrice.toLocaleString()}₫{/* {data.promotionPrice.toLocaleString()}₫ */}
                  </span>
                  {shortenCard === false && (
                     <span className={cx('discount-percent')}>
                        {((1 - data.promotionPrice / data.price) * 100).toLocaleString()}% GIẢM
                     </span>
                  )}
               </div>
               <div className={cx('cost-current-timer')}>
                  <span>Còn {formatDistanceToNow(new Date(data.startDay), { locale: vietnamLocate })}</span>
               </div>
               <div>
                  <span className={cx('slot')}>
                     <u>Số chỗ còn</u>
                     <p className={cx('number-slot')}>{data.numberOfPeople - data.subcriber}</p>
                  </span>
               </div>
            </div>
         </div>
      </Card>
   );
}

export default TourCardItem;
