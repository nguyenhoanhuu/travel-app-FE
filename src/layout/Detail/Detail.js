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
import { Row, Col, Popconfirm } from 'antd';
import PointOfLocation from '~/component/PointOfLocation/PointOfLocation';
import TravelingSchedule from '~/component/TravelingSchedule/TravelingSchedule';
import CostTable from '~/component/CostTable/CostTable';
import * as GetTour from '~/service/GetTour';
import { useEffect, useState } from 'react';
import TourCard from '~/component/TourCard/TourCard.js';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Policy from '~/component/Policy/Policy';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
const cx = classNames.bind(style);

function Detail() {
   const navigate = useNavigate();
   const location = useLocation();
   const [listTour, setListTour] = useState([]);
   const [tourSelected, setTourSelected] = useState();
   const [isDisableBtnAddTour, setIsDisableBtnAddTour] = useState(false);

   const getTourById = async (tourId) => {
      await GetTour.search('/tours', tourId)
         .then((data) => {
            setTourSelected(data);
            window.scrollTo(0, 0);
         })
         .catch((error) => console.log(error));
   };

   const fetchApi = async () => {
      await GetTour.searchParamUrl('tours/top3/random', 'type=Trong Nuoc')
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   const { tourId } = useParams();
   const handleSetNumberDay = (date) => {
      const diffTime = date[1] - date[0];
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
   };

   useEffect(() => {
      getTourById(tourId);
      fetchApi();
   }, [tourId]);

   useEffect(() => {
      if (tourSelected != null) {
         console.log(handleSetNumberDay([new Date(), dayjs(tourSelected.startDay, 'YYYY-MM-DD')]));
         if (handleSetNumberDay([new Date(), dayjs(tourSelected.startDay, 'YYYY-MM-DD')]) <= 0) {
            setIsDisableBtnAddTour(true);
         } else {
            setIsDisableBtnAddTour(false);
         }
      }
   }, [tourSelected]);

   return (
      <div className={cx('wrapper')}>
         <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            // theme="dark"
         />
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
                        {tourSelected && tourSelected.promotionPrice.toLocaleString()}₫
                     </span>
                     / khách
                  </p>
               </div>
               <div className={isDisableBtnAddTour ? cx('group-add-cart2') : cx('group-add-cart')}>
                  {isDisableBtnAddTour ? (
                     // eslint-disable-next-line jsx-a11y/anchor-is-valid
                     <a onClick={() => toast.error('tour hiện tại không khả dụng !')}>
                        <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                        <label>Đặt ngay</label>
                     </a>
                  ) : window.localStorage.getItem('token') ? (
                     <Link to={tourSelected && `/Booking/TourBooking/${tourSelected.id}`}>
                        <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                        <label>Đặt ngay</label>
                     </Link>
                  ) : (
                     <a>
                        <Popconfirm
                           title="cập nhật thông tin tình trạng"
                           description="bạn cần đăng nhập trước khi thực hiện chức năng!"
                           okText="Xác nhận"
                           cancelText="Thoát"
                           placement="left"
                           onConfirm={() => navigate('/login', { state: { history: location.pathname } })}
                           icon={
                              <QuestionCircleOutlined
                                 style={{
                                    color: 'red',
                                 }}
                              />
                           }
                        >
                           <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                           <label>Đặt ngay</label>
                        </Popconfirm>
                     </a>
                  )}
                  <a href="https://www.facebook.com/profile.php?id=100092037799063" target="_blank">
                     <label>Liên hệ tự vấn</label>
                  </a>
               </div>
            </div>
         </div>
         <div className={cx('list-image')}>
            {tourSelected && <ImageDetail listImage={tourSelected.images}></ImageDetail>}
         </div>

         <Row gutter={16}>
            <Col md={{ span: 10 }} sm={{ span: 23 }} xs={{ span: 24 }} className={cx('time')}>
               <div className={cx('box-order')}>
                  <div>
                     <p>
                        Khởi hành <b>{tourSelected && format(new Date(tourSelected.startDay), 'dd/MM/yyyy')}</b>
                     </p>
                     <p>
                        Thời gian <b>{tourSelected && tourSelected.numberOfDay} ngày</b>
                     </p>
                     <p>
                        Nơi khởi hành <b>{tourSelected && tourSelected.departure}</b>
                     </p>
                     <p>
                        Số chỗ còn nhận <b>{tourSelected && tourSelected.numberOfPeople - tourSelected.subcriber}</b>
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
            <Col md={{ span: 14 }} sm={{ span: 23 }} xs={{ span: 24 }}>
               <div className={cx('group-services')}>
                  <div className={cx('item')}>
                     <i className="bi bi-flag fa-2x"></i>
                     <label>Thời gian</label>
                     <p>
                        {tourSelected && tourSelected.numberOfDay} ngày {tourSelected && tourSelected.numberOfDay - 1}{' '}
                        đêm
                     </p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-bus-front-fill fa-2x"></i>
                     <label>Phương tiện di chuyển</label>
                     <p>
                        {tourSelected &&
                           tourSelected.tourDetail &&
                           tourSelected.tourDetail.transport &&
                           tourSelected.tourDetail.transport}
                     </p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-map fa-2x"></i>
                     <label>Điểm tham quan</label>
                     <p>{tourSelected && tourSelected.departure + ',' + tourSelected.destination}</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-fire fa-2x"></i>
                     <label>Ẩm thực</label>
                     <p>Buffet sáng, Theo thực đơn, Đặc sản địa phương</p>
                  </div>
                  <div className={cx('item')}>
                     <i className="bi bi-building fa-2x"></i>
                     <label>Khách sạn</label>
                     <p>
                        {`khách sạn ${
                           tourSelected &&
                           tourSelected.tourDetail &&
                           tourSelected.tourDetail.starHotel &&
                           tourSelected.tourDetail.starHotel
                        } sao`}
                     </p>
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
         {window.innerWidth <= 500 ? (
            <PointOfLocation title={'Những địa điểm tham quan'} num={3}></PointOfLocation>
         ) : (
            <PointOfLocation title={'Những địa điểm tham quan'} num={5}></PointOfLocation>
         )}
         {tourSelected && (
            <TravelingSchedule data={tourSelected.itineraryDetail} startDay={tourSelected.startDay}></TravelingSchedule>
         )}
         <Row>
            <Col md={{ span: 16 }} sm={{ span: 23 }} xs={{ span: 24 }}>
               <div>
                  <h2>Giá tour & phụ thu phòng đơn</h2>
                  {tourSelected && (
                     <CostTable
                        adultPrice={tourSelected.adultPrice}
                        childPrice={tourSelected.childPrice}
                        babyPrice={tourSelected.babyPrice}
                     ></CostTable>
                  )}
               </div>
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
               <div>
                  <h2>Thông tin hướng dẫn viên</h2>
                  <div className={cx('infor-tour-guide')}>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV dẫn đoàn</span>
                        <p>{tourSelected && tourSelected.tourGuides[0] && tourSelected.tourGuides[0].name}</p>
                     </div>
                     <div className={cx('infor-tour-guide-item')}>
                        <span>HDV tiễn</span>
                        <p>Đang cập nhật</p>
                     </div>
                  </div>
               </div>
            </Col>
         </Row>
         <div className={cx('policy-tour')}>
            <h2 className={cx('title', 'policy-title')}>Những thông tin cần lưu ý</h2>
            {tourSelected && <Policy data={tourSelected.policy}></Policy>}
         </div>
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
