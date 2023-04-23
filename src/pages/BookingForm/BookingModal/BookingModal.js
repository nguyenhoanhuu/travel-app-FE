import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Collapse, Typography, theme, Table, List } from 'antd';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
const cx = classNames.bind(styles);
const { Panel } = Collapse;
const dataSample = [
   [
      {
         index: 1,
         name: 'ThuanHoang',
         gender: 'nam',
         birthDay: '04/04/2023',
      },
      {
         index: 2,
         name: 'HoanHuu',
         gender: 'Nữ',
         birthDay: '29/03/2023',
      },
      {
         index: 3,
         name: 'Trangtruong',
         gender: 'Nữ',
         birthDay: '02/04/2023',
      },
      {
         index: 4,
         name: 'Bé yêu',
         gender: 'Nữ',
         birthDay: '11/04/2023',
      },
   ],
   [
      {
         index: 1,
         name: 'ThuanHoang',
         gender: 'nam',
         birthDay: '04/04/2023',
      },
      {
         index: 2,
         name: 'HoanHuu',
         gender: 'Nữ',
         birthDay: '29/03/2023',
      },
      {
         index: 3,
         name: 'Trangtruong',
         gender: 'Nữ',
         birthDay: '02/04/2023',
      },
      {
         index: 4,
         name: 'Bé yêu',
         gender: 'Nữ',
         birthDay: '11/04/2023',
      },
   ],
   [],
   [],
];
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

function BookingModal({ isOpenModal, setIsOpenModal, listInforCustomer, inforContact, note, noteMore }) {
   const [loading, setLoading] = useState(false);
   const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         setIsOpenModal(false);
      }, 3000);
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
               Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
               Submit
            </Button>,
            <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
               Search on Google
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
                        <strong>Họ và tên</strong> : {inforContact.userName}
                     </p>
                     <p>
                        <strong>Email</strong> : {inforContact.email}
                     </p>
                     <p>
                        <strong>Số điện thoại</strong> : {inforContact.phoneNumber}
                     </p>

                     <p>
                        <strong>Địa chỉ</strong> : {inforContact.address}
                     </p>
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
                     <Panel header={<p className={cx('title-panel')}>Ghi chú thêm</p>} key="7" style={panelStyle}>
                        {noteMore}
                     </Panel>
                  )}
               </Collapse>
            </Col>
         </Row>
      </Modal>
   );
}

export default BookingModal;
