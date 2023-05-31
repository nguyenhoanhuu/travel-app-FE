import { Col, Image, Row, Button, Popconfirm, Modal, message } from 'antd';
import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
import { format } from 'date-fns';
import { useParams, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import * as GetTour from '~/service/GetTour';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as post from '~/util/httpRequest';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Payment() {
   const navigate = useNavigate();
   const { state } = useLocation();
   const { bookingId } = useParams();
   const [tourSelected, setTourSelected] = useState();
   const [bookingSelected, setBookingSelected] = useState();
   const [showModal, setShowModal] = useState(false);
   const [messageApi, contextHolder] = message.useMessage();
   const key = 'updatable';
   const getTourById = async (tourId) => {
      await GetTour.search('/tours', tourId)
         .then((data) => {
            setTourSelected(data);
         })
         .catch((error) => console.log(error));
   };
   const handlePayment = async (type, token) => {
      console.log(token);
      messageApi.open({
         key,
         type: 'loading',
         content: 'đang xử lý thanh toán...',
      });

      const body = {
         accountInfo: token ? token.email : '',
         type: type,
         bookingId: bookingId,
      };
      const header = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            tokenStripe: token ? token.id : '',
         },
      };
      await post
         .postWithHeader('payment/save', body, header)
         .then((data) => {
            // setBookingSelected(data);
            messageApi.open({
               type: 'success',
               key,
               type: 'đặt tour và thanh toán thành công ',
               content: 'đặt tour và thanh toán thành công !',
               duration: 2,
            });
         })
         .catch((error) => console.log(error))
         .finally(() => {
            setTimeout(() => {
               navigate('/');
            }, 1000);
         });
   };
   const getBookingById = async (bookingId) => {
      const header = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
         },
      };
      await GetTour.searchParamUrl('bookings/id', `bookingId=${bookingId}`, header)
         .then((data) => {
            console.log(data);
            setBookingSelected(data.booking);
            getTourById(data.booking.tourId);
         })
         .catch((error) => console.log(error));
   };
   console.log(tourSelected);
   useEffect(() => {
      getBookingById(bookingId);
      // getTourById(23);
      // getBookingById(24);
   }, []);
   return (
      <>
         {contextHolder}
         <div className={cx('boxShadow')}>
            <p style={{ textAlign: 'center', fontWeight: 600, color: '#7f4d10c7', fontSize: 35 }}>Thanh Toán </p>
            <h3>Thông tin Tour</h3>
            <Row gutter={16} justify="center" align={'middle'} className={cx('abbreviate-tour-content')}>
               <Col span={9}>
                  <Image
                     className={cx('image', 'content')}
                     style={{ height: 200, margin: '0 20 ' }}
                     src="https://media.travel.com.vn/tour/tfd_230222041933_956108.JPG"
                  ></Image>
               </Col>
               <Col md={{ span: 15 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                  <h4>{tourSelected && tourSelected.name}</h4>
                  <div className={cx('infor-detail-tour')} style={{ color: '#000' }}>
                     <span>
                        Mã Tour: <b>{tourSelected && tourSelected.id}</b>
                     </span>
                     <span>
                        Khởi hành: <b>{tourSelected && format(new Date(tourSelected.startDay), 'dd/MM/yyyy')}</b>
                     </span>
                     <span>
                        Thời gian: <b>{tourSelected && tourSelected.numberOfDay} ngày</b>
                     </span>
                     <span>
                        Nơi khởi hành: <b>{tourSelected && tourSelected.departure}</b>
                     </span>
                  </div>
               </Col>
            </Row>
            <h3>Chi phí cần trả </h3>
            <Row gutter={24} style={{ padding: 10, color: '#000' }}>
               <Col span={12}>
                  <p style={{ fontSize: 19, fontWeight: 500 }}>Giá :</p>
               </Col>
               <Col span={12}>
                  <p style={{ fontSize: 19 }}>{bookingSelected && bookingSelected.total.toLocaleString()} Vnd</p>
               </Col>
            </Row>
            <h3>Chọn phương thức thanh toán </h3>
            <Row gutter={24} style={{ padding: 20 }}>
               {/* <Col span={7}>
                  <Popconfirm
                     title="xác nhận thông tin"
                     description="xác nhận thanh toán bằng hình thức chuyển khoản!"
                     okText="Xác nhận"
                     cancelText="Thoát"
                     placement="top"
                     // onConfirm={() => navigate('/login', { state: { history: location.pathname } })}
                     onConfirm={() => handlePayment('Chuyển khoản')}
                     icon={
                        <QuestionCircleOutlined
                           style={{
                              color: 'red',
                           }}
                        />
                     }
                  >
                     <Button>Chuyển khoản</Button>
                  </Popconfirm>
               </Col> */}
               <Col span={7}>
                  <Popconfirm
                     title="xác nhận thông tin"
                     description="xác nhận thanh toán bằng hình thức tiền mặt!"
                     okText="Xác nhận"
                     cancelText="Thoát"
                     placement="top"
                     onConfirm={() => handlePayment('Tiền mặt')}
                     icon={
                        <QuestionCircleOutlined
                           style={{
                              color: 'red',
                           }}
                        />
                     }
                  >
                     <Button>Tiền mặt</Button>
                  </Popconfirm>
               </Col>
               <Col span={7}>
                  <Button onClick={() => setShowModal(true)}>Ngân hàng </Button>
               </Col>
            </Row>
            <Modal open={showModal} onCancel={() => setShowModal(false)}>
               <StripeCheckout
                  stripeKey="pk_test_51Mcj1pBPykLB72v2GfBkdkLyyOla9t1xE8rEL44vXrwNfKvP8rIQMqxNU4OEto2khDIxRh3Lfws5loYI2228Dht600zEIom44U"
                  token={(e) => handlePayment('Ngân hàng', e)}

                  // locale="vietnamLocate"
               />
            </Modal>
         </div>
      </>
   );
}

export default Payment;
