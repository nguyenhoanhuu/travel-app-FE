import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
import { Row, Col, List, Button } from 'antd';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { DollarCircleOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);
function DetailBill() {
   const location = useLocation();
   const { bookingId } = useParams();
   const [data, setData] = useState(location.state.data.booking);
   const navigate = useNavigate();
   console.log(data);
   useEffect(() => {
      setData(location.state.data.booking);
   }, [bookingId]);
   return (
      <div className={cx('boxShadow2')}>
         <p style={{ textAlign: 'center', fontWeight: 600, color: '#7f4d10c7', fontSize: 35 }}>Thông tin hóa đơn </p>
         {/* <h3>Thông tin Hóa đơn</h3> */}
         <Row gutter={24}>
            <Col span={11}>
               <div className={cx('infor-detail-tour')} style={{ color: '#000' }}>
                  <span>
                     Mã Tour: <b>{data.id}</b>
                  </span>
                  <span>
                     Tên khách hàng: <b>{data.nameCustomer}</b>
                  </span>
                  <span>
                     Ngày tạo hóa đơn: <b>{format(new Date(data.createAt), 'dd/MM/yyyy')}</b>
                  </span>
                  <span>
                     Tên Tour: <b>{data.nameTour}</b>
                  </span>
                  <span>
                     Tổng tiền: <b>{data.total.toLocaleString()} Vnd</b>
                  </span>
                  <span>
                     Thông tin Tour :
                     <Button style={{ width: '40%' }} onClick={() => navigate(`/detail/${data.tourId}`)}>
                        Xem thông tin tour
                     </Button>
                  </span>
               </div>
            </Col>
            <Col span={11}>
               <div className={cx('infor-detail-tour')} style={{ color: '#000' }}>
                  <span>
                     Ngày khởi hành : <b>{format(new Date(data.startDayTour), 'dd/MM/yyyy')}</b>
                  </span>
                  <span>
                     Giờ khởi hành : <b>{data.departureTime}</b>
                  </span>
                  <span>
                     Ngày kết thúc: <b>{format(new Date(data.endDayTour), 'dd/MM/yyyy')}</b>
                  </span>
                  <span>
                     Số lượng Người lớn: <b>{data.numberOfAdbult}</b>
                  </span>
                  <span>
                     Số lượng trẻ em: <b>{data.numberOfChildren}</b>
                  </span>
                  <span>
                     Trạng thái Tour: <b>{data.status}</b>
                  </span>
               </div>
            </Col>
            {data.status === 'Chờ thanh toán' && (
               <Col span={24}>
                  <Button
                     icon={<DollarCircleOutlined />}
                     style={{ width: '100%' }}
                     onClick={() => navigate(`/payment/${data.id}`)}
                  >
                     Thanh Toán
                  </Button>
               </Col>
            )}
            <Col span={24}>
               <h3>Thông tin khách hàng</h3>
               <h4>Người lớn </h4>
               <List
                  bordered
                  dataSource={data.infoOfAdbult}
                  renderItem={(item) => (
                     <List.Item>
                        <div style={{ display: 'flex' }}>
                           <i className="bi bi-dot"></i>
                           <div style={{ display: 'flex', justifyContent: 'space-evenly', width: 400 }}>
                              <p>
                                 <strong>Tên :</strong>
                                 {item.name}
                              </p>
                              <p>
                                 <strong>Giới tính :</strong>
                                 {item.gender}
                              </p>
                              <p>
                                 <strong>Ngày sinh :</strong>
                                 {item.birthDay}
                              </p>
                           </div>
                        </div>
                     </List.Item>
                  )}
                  grid={{ gutter: 16, column: 2 }}
               />
               <h4>Trẻ em</h4>
               <List
                  bordered
                  dataSource={data.infoOfChildren}
                  renderItem={(item) => (
                     <List.Item>
                        <div style={{ display: 'flex' }}>
                           <i className="bi bi-dot"></i>
                           <div style={{ display: 'flex', justifyContent: 'space-evenly', width: 400 }}>
                              <p>
                                 <strong>Tên :</strong>
                                 {item.name}
                              </p>
                              <p>
                                 <strong>Giới tính :</strong>
                                 {item.gender}
                              </p>
                              <p>
                                 <strong>Ngày sinh :</strong>
                                 {item.birthDay}
                              </p>
                           </div>
                        </div>
                     </List.Item>
                  )}
                  grid={{ gutter: 16, column: 2 }}
               />
            </Col>
            <Col span={24}>
               <h3>Ghi chú</h3>
               <List
                  bordered
                  dataSource={data.note.split(',')}
                  renderItem={(item) => (
                     <List.Item>
                        <i className="bi bi-dot"></i> {item}
                     </List.Item>
                  )}
                  grid={{ gutter: 16, column: 2 }}
               />
            </Col>
         </Row>
      </div>
   );
}

export default DetailBill;
