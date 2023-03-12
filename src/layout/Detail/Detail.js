/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import style from '~/layout/Detail/Detail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCartShopping,
   faHeart,
   faTicket,
   faCalendarDays,
   faPhone,
   faMailForward,
} from '@fortawesome/free-solid-svg-icons';
import ImageDetail from '~/component/ImageDetail/ImageDetail';
import { Row, Col } from 'antd';
import PointOfLocation from '~/component/PointOfLocation/PointOfLocation';
import TravelingSchedule from '~/component/TravelingSchedule/TravelingSchedule';
import CostTable from '~/component/CostTable/CostTable';
import * as GetTour from '~/service/GetTour';
import { useEffect, useState } from 'react';
import TourCard from '~/component/TourCard/TourCard.js';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const cx = classNames.bind(style);

function Detail() {
   const [listTour, setListTour] = useState([]);
   const [tourSelected, setTourSelected] = useState();

   const getTourById = async (tourId) => {
      await GetTour.search('/tours/info', tourId)
         .then((data) => {
            setTourSelected(data);
         })
         .catch((error) => console.log(error));
   };

   const fetchApi = async () => {
      await GetTour.search('tours/toptours', 4)
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   const { tourId } = useParams();
   useEffect(() => {
      getTourById(tourId);
      fetchApi();
   }, []);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrap-mark')}>
            <FontAwesomeIcon className={cx('icon')} icon={faTicket}></FontAwesomeIcon>
            <label htmlFor="ticket" className={cx('wrap-mark-title')}>
               {tourSelected && tourSelected.id}
            </label>
         </div>
         <div className={cx('content-header')}>
            <div className={cx('content-header-1')}>
               <h1 className={cx('title')}>{tourSelected && tourSelected.name}</h1>
               <div className={cx('short-rating')}>
                  <span className={cx('tour-rating')}>9.4</span>
                  <div className={cx('s-comment')}>
                     <h4>Tuyệt vởi</h4>
                     <p>{tourSelected && tourSelected.liked} quan tâm</p>
                  </div>
                  <div className={cx('s-wishlist')}>
                     <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: '#fd5056', marginRight: '2px' }}
                        size="2x"
                     ></FontAwesomeIcon>
                     <label>{tourSelected && tourSelected.liked}</label>
                  </div>
               </div>
            </div>
            <div className={cx('content-header-2')}>
               <div className={cx('group-price')}>
                  <p>
                     Giá
                     <span className={cx('line-thought')}>{tourSelected && tourSelected.price.toLocaleString()}₫</span>/
                     khách
                  </p>
                  <p>
                     <span className={cx('current-price')}>
                        {' '}
                        {tourSelected
                           ? (tourSelected.price * (1 - tourSelected.discount)).toLocaleString()
                           : tourSelected && tourSelected.price.toLocaleString()}
                        ₫
                     </span>
                     / khách
                  </p>
               </div>
               <div className={cx('group-add-cart')}>
                  <a href="/addCart">
                     <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                     <label>Đặt ngay</label>
                  </a>
                  <a href="/addCart">
                     <label>Liên hệ tự vấn</label>
                  </a>
               </div>
            </div>
         </div>
         <div className={cx('list-image')}>
            <ImageDetail></ImageDetail>
         </div>
         <Row>
            <Col span={10} className={cx('time')}>
               <div className={cx('box-order')}>
                  <div>
                     <p>
                        Khởi hành <b>{tourSelected && format(new Date(tourSelected.startday), 'dd/MM/yyyy')}</b>
                     </p>
                     <p>
                        Thời gian <b>{tourSelected && tourSelected.numberofday} ngày</b>
                     </p>
                     <p>
                        Nơi khởi hành <b>{tourSelected && tourSelected.departure}</b>
                     </p>
                     <p>
                        Số chỗ còn nhận <b>{tourSelected && tourSelected.numberofpeople - tourSelected.subcriber}</b>
                     </p>
                  </div>
                  <div className={cx('calendar')}>
                     <div className={cx('calendar-box')}>
                        <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
                        <label>ngày khác</label>
                     </div>
                  </div>
               </div>
               <div className={cx('box-support')}>
                  <label>Quý khách cần hỗ trợ?</label>
                  <div className={cx('group-contact')}>
                     <div className={cx('phone', 'contact-box')}>
                        <FontAwesomeIcon icon={faPhone} size="2x"></FontAwesomeIcon>
                        <p>
                           Gọi miễn phí <br />
                           qua internet
                        </p>
                     </div>
                     <div className={cx('mail', 'contact-box')}>
                        <FontAwesomeIcon icon={faMailForward} size="2x"></FontAwesomeIcon>
                        <p>
                           Gửi yêu cầu <br />
                           hỗ trợ ngay
                        </p>
                     </div>
                  </div>
               </div>
            </Col>
            <Col span={14}>
               <div className={cx('group-services')}>
                  <div className={cx('item')}>
                     <i className="bi bi-flag fa-2x"></i>
                     <label>Thời gian</label>
                     <p>
                        {tourSelected && tourSelected.numberofday} ngày {tourSelected && tourSelected.numberofday - 1}
                        đêm
                     </p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-bus-front-fill fa-2x"></i>
                     <label>Phương tiện di chuyển</label>
                     <p>{tourSelected && tourSelected.transport}</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-map fa-2x"></i>
                     <label>Điểm tham quan</label>
                     <p>Cần Thơ, Cà Mau, Bạc Liêu, Sóc Trăng</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-fire fa-2x"></i>
                     <label>Ẩm thực</label>
                     <p>Buffet sáng, Theo thực đơn, Đặc sản địa phương</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-building fa-2x"></i>
                     <label>Khách sạn</label>
                     <p>khách sạn {tourSelected && tourSelected.starhotel} sao</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-clock fa-2x"></i>
                     <label>Thời gian lý tưởng</label>
                     <p>Quanh năm</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-people fa-2x"></i>
                     <label>Đối tượng thích hợp</label>
                     <p>Gia đình nhiều thế hệ</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-stars fa-2x"></i>
                     <label>Ưu đãi</label>
                     <p>Đã bao gồm ưu đãi trong giá tour</p>
                  </div>
               </div>
            </Col>
         </Row>
         <PointOfLocation title={'Những địa điểm tham quan'} num={5}></PointOfLocation>
         {tourSelected && (
            <TravelingSchedule data={tourSelected.itineraryDetail} startDay={tourSelected.startday}></TravelingSchedule>
         )}
         <Row>
            <Col span={16}>
               <div>
                  <h2>Giá tour & phụ thu phòng đơn</h2>
                  {tourSelected && <CostTable price={tourSelected.price}></CostTable>}
               </div>
            </Col>
            <Col span={8}>
               <div>
                  <h2>Thông tin hướng dẫn viên</h2>
                  <div className={cx('infor-tour-guide')}>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV dẫn đoàn</span>
                        <p>{tourSelected && tourSelected.tourGuide.name}</p>
                     </div>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV tiễn</span>
                        <p>Đang cập nhật</p>
                     </div>
                  </div>
               </div>
            </Col>
         </Row>
         <div className={cx('suggest-tour')}>
            <TourCard
               title="Có thể Quý khách sẽ thích"
               className={'title-center'}
               isSmall={true}
               shortenCard={true}
               data={listTour}
            ></TourCard>
         </div>
      </div>
   );
}

export default Detail;
