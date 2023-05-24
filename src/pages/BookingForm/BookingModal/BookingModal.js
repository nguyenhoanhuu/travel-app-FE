import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Collapse, Typography, theme, Table, List } from 'antd';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import * as post from '~/service/Post';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const { Panel } = Collapse;

const columns = [
   {
      title: 'STT',
      dataIndex: 'index',
      key: 'row',
      width: '10%',
      fixed: 'left',
   },
   {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
   },
   {
      title: 'Giới tính ',
      dataIndex: 'gender',
      key: 'gender',
   },
   {
      title: 'Ngày sinh',
      dataIndex: 'birthDay',
      key: 'birthDay',
      width: 150,
   },
];

function BookingModal({
   isOpenModal,
   setIsOpenModal,
   listInforCustomer,
   inforContact = {},
   note,
   noteMore,
   inforTour,
   voucherCode,
   totalPrice,
}) {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const handleOk = async () => {
      // setLoading(true);
      // setLoading(false);
      setIsOpenModal(false);
      await post
         .postWithBodyAndToken(
            `${process.env.REACT_APP_BASE_URL}bookings/save`,
            {
               startDayTour: inforTour.startDay,
               endDayTour: inforTour.endDay,
               departureTime: inforTour.departureTime,
               nameCustomer: inforContact.name,
               nameTour: inforTour.name,
               tourId: inforTour.id,
               priceTour: inforTour.price,
               priceVoucher: inforTour.promotionPrice,
               voucherCode: voucherCode ? voucherCode : '',
               numberOfAdbult: listInforCustomer[0].length,
               numberOfChildren:
                  listInforCustomer[1].length + listInforCustomer[2].length + listInforCustomer[3].length,
               infoOfAdbult: listInforCustomer[0],
               infoOfChildren: listInforCustomer[1].concat(listInforCustomer[2], listInforCustomer[3]),
               createAt: new Date(),
               total: totalPrice,
               note: noteMore ? note.toString() + ',' + noteMore : note.toString(),
               status: 'Chờ thanh toán',
               payment: {
                  id: 0,
                  accountInfo: 'string',
                  paymentDate: new Date(),
                  status: 'Chờ thanh toán',
                  type: 'Chuyển khoản',
                  bookingId: 0,
               },
            },
            window.localStorage.getItem('token'),
         )
         .then((res) => {
            console.log(res);
            navigate(`/payment/${res.data.bookingId}`);
         })
         .catch((error) => console.log(error));
      console.log({
         startDayTour: inforTour.startDay,
         endDayTour: inforTour.endDay,
         departureTime: inforTour.departureTime,
         nameCustomer: inforContact.name,
         nameTour: inforTour.name,
         priceTour: inforTour.price,
         priceVoucher: inforTour.promotionPrice,
         voucherCode: voucherCode,
         numberOfAdbult: listInforCustomer[0].length,
         numberOfChildren: listInforCustomer[1].length + listInforCustomer[3].length + listInforCustomer[3].length,
         infoOfAdbult: listInforCustomer[0],
         infoOfChildren: listInforCustomer[1].concat(listInforCustomer[2], listInforCustomer[3]),
         createAt: new Date(),
         total: totalPrice,
         note: note + ',' + noteMore,
         status: 'Chờ thanh toán',
         payment: {
            id: 0,
            accountInfo: 'string',
            paymentDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            status: 'Chờ thanh toán',
            type: 'Chuyển khoản',
            bookingId: 0,
         },
      });
   };

   const handleCancel = () => {
      setIsOpenModal(false);
   };
   const { token } = theme.useToken();

   const panelStyle = {
      marginBottom: 24,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none',
      fontSize: 18,
   };
   return (
      <Modal
         open={isOpenModal}
         // title="Xác nhận các thông tin đặt tour"
         onOk={handleOk}
         onCancel={handleCancel}
         width={window.innerWidth <= 908 ? '100%' : '70%'}
         // {window.innerWidth < 908}
         footer={[
            <Button key="back" onClick={handleCancel}>
               Thoát
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
               Xác nhận
            </Button>,
         ]}
      >
         <Typography.Title
            // editable
            level={3}
            style={{
               margin: 0,
            }}
         >
            Xác nhận các thông tin đặt tour
         </Typography.Title>
         <Row gutter={24} style={{ paddingTop: 20 }}>
            <Col md={{ span: 24 }} sm={{ span: 23 }} xs={{ span: 24 }}>
               <Collapse
                  bordered={false}
                  defaultActiveKey={['1']}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  style={{
                     background: token.colorBgContainer,
                  }}
               >
                  <Panel header={<p className={cx('title-panel')}>Thông tin liên lạc</p>} key="1" style={panelStyle}>
                     <p>
                        <strong>Họ và tên</strong> : {inforContact.name}
                     </p>
                     <p>
                        <strong>Email</strong> : {inforContact.email}
                     </p>
                     <p>
                        <strong>Số điện thoại</strong> : {inforContact.phone}
                     </p>

                     {/* <p>
                        <strong>Địa chỉ</strong> : {inforContact.address}
                     </p> */}
                  </Panel>
                  <Panel header={<p className={cx('title-panel')}>Thông tin khách hàng</p>} key="2" style={panelStyle}>
                     <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                           background: token.colorBgContainer,
                        }}
                     >
                        <Panel header={<p className={cx('title-panel')}>Người lớn</p>} key="3" style={panelStyle}>
                           <Table
                              dataSource={listInforCustomer[0]}
                              columns={columns}
                              size="small"
                              pagination={false}
                              scroll={{ x: 600, y: 300 }}
                           />
                        </Panel>
                        {listInforCustomer[1].length > 0 && (
                           <Panel header={<p className={cx('title-panel')}>Trẻ em</p>} key="4" style={panelStyle}>
                              <Table
                                 dataSource={listInforCustomer[1]}
                                 columns={columns}
                                 size="small"
                                 pagination={false}
                                 scroll={{ x: 600, y: 300 }}
                              />
                           </Panel>
                        )}
                        {listInforCustomer[2].length > 0 && (
                           <Panel header={<p className={cx('title-panel')}>Trẻ con</p>} key="5" style={panelStyle}>
                              <Table
                                 dataSource={listInforCustomer[2]}
                                 columns={columns}
                                 size="small"
                                 pagination={false}
                                 scroll={{ x: 600, y: 300 }}
                              />
                           </Panel>
                        )}
                        {listInforCustomer[3].length > 0 && (
                           <Panel header={<p className={cx('title-panel')}>Em bé</p>} key="6" style={panelStyle}>
                              <Table
                                 dataSource={listInforCustomer[3]}
                                 columns={columns}
                                 size="small"
                                 pagination={false}
                                 scroll={{ x: 600, y: 300 }}
                              />
                           </Panel>
                        )}
                     </Collapse>
                  </Panel>
                  {note && (
                     <Panel header={<p className={cx('title-panel')}>Ghi chú</p>} key="7" style={panelStyle}>
                        <List
                           bordered
                           dataSource={note}
                           renderItem={(item) => (
                              <List.Item>
                                 <i className="bi bi-dot"></i> {item}
                              </List.Item>
                           )}
                           grid={{ gutter: 16, column: 2 }}
                        />
                     </Panel>
                  )}
                  {noteMore && (
                     <Panel header={<p className={cx('title-panel')}>Ghi chú thêm</p>} key="8" style={panelStyle}>
                        {noteMore}
                     </Panel>
                  )}
                  {/* <Panel header={<p className={cx('title-panel')}>Thanh Toán</p>} key="9" style={panelStyle}>
           
                     <StripeCheckout
                        stripeKey="pk_test_51Mcj1pBPykLB72v2GfBkdkLyyOla9t1xE8rEL44vXrwNfKvP8rIQMqxNU4OEto2khDIxRh3Lfws5loYI2228Dht600zEIom44U"
                        token={handleToken}
                        // locale="vietnamLocate"
                     />
                  </Panel> */}
               </Collapse>
            </Col>
         </Row>
      </Modal>
   );
}

export default BookingModal;
