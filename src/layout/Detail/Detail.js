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
   faFlag,
} from '@fortawesome/free-solid-svg-icons';
import ImageDetail from '~/component/ImageDetail/ImageDetail';
import { Row, Col } from 'antd';
import PointOfLocation from '~/component/PointOfLocation/PointOfLocation';
import TravelingSchedule from '~/component/TravelingSchedule/TravelingSchedule';
import CostTable from '~/component/CostTable/CostTable';
import TourCard from '~/component/TourCard/TourCard.js';

const cx = classNames.bind(style);

function Detail() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrap-mark')}>
            <FontAwesomeIcon className={cx('icon')} icon={faTicket}></FontAwesomeIcon>
            <label htmlFor="ticket" className={cx('wrap-mark-title')}>
               NDSGN1871-047-160223VU-V
            </label>
         </div>
         <div className={cx('content-header')}>
            <div className={cx('content-header-1')}>
               <h1 className={cx('title')}>
                  Hà Nội - Sapa - Fansipan - Ninh Bình - Tràng An - Bái Đính - Tuyệt Tịnh Cốc - Hạ Long - Yên Tử I Ngắm
                  Hoa Đào
               </h1>
               <div className={cx('short-rating')}>
                  <span className={cx('tour-rating')}>9.4</span>
                  <div className={cx('s-comment')}>
                     <h4>Tuyệt vởi</h4>
                     <p>1 quan tâm</p>
                  </div>
                  <div className={cx('s-wishlist')}>
                     <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: '#fd5056', marginRight: '2px' }}
                        size="2x"
                     ></FontAwesomeIcon>
                     <label>128</label>
                  </div>
               </div>
            </div>
            <div className={cx('content-header-2')}>
               <div className={cx('group-price')}>
                  <p>
                     Giá <span className={cx('line-thought')}>11,390,000₫</span>/ khách
                  </p>
                  <p>
                     <span className={cx('current-price')}>11,390,000₫</span>/ khách
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
                        Khởi hành <b>15/02/2023</b>
                     </p>
                     <p>
                        Thời gian <b>5 ngày</b>
                     </p>
                     <p>
                        Khởi hành <b>15/02/2023</b>
                     </p>
                     <p>
                        Nơi khởi hành <b>TP. Hồ Chí Minh </b>
                     </p>
                     <p>
                        Số chỗ còn nhận <b>5</b>
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
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>{' '}
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>{' '}
                  <div className={cx('item')}>
                     <FontAwesomeIcon icon={faFlag} size="2x"></FontAwesomeIcon>
                     <label>Thời gian</label>
                     <p>5 ngày 4 đêm</p>
                  </div>
               </div>
            </Col>
         </Row>
         <PointOfLocation title={'Những địa điểm tham quan'} num={5}></PointOfLocation>
         <TravelingSchedule></TravelingSchedule>
         <Row>
            <Col span={16}>
               <div>
                  <h2>Giá tour & phụ thu phòng đơn</h2>
                  <CostTable></CostTable>
               </div>
            </Col>
            <Col span={8}>
               <div>
                  <h2>Thông tin hướng dẫn viên</h2>
                  <div className={cx('infor-tour-guide')}>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV dẫn đoàn</span>
                        <p>Đang cập nhật</p>
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
               numTour={4}
               isSmall={true}
               shortenCard={true}
            ></TourCard>
         </div>
      </div>
   );
}

export default Detail;
