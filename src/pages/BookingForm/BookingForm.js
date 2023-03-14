import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
import Container from '@mui/material/Container';
import { Row, Col, Image, Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import FormInputUser from './FormInputUser/FormInputUser';

const cx = classNames.bind(styles);

function BookingForm() {
   const numberSlotInTour = 9;
   const [quantityAdult, setQuantityAdult] = useState(1);
   const [quantityChild, setQuantityChild] = useState(0);
   const [quantityInfant, setQuantityInfant] = useState(0);
   const [quantityBabe, setQuantityBabe] = useState(0);

   const [form] = Form.useForm();
   const handleChangeQuantity = (callBack, quantity, action) => {
      let provisionalQuantity;
      let quantityTotal;
      switch (action) {
         case 'minus':
            provisionalQuantity = quantity - 1;
            quantityTotal = quantityAdult + quantityBabe + quantityChild + quantityInfant - 1;
            break;
         case 'plus':
            provisionalQuantity = quantity + 1;
            quantityTotal = quantityAdult + quantityBabe + quantityChild + quantityInfant + 1;
            break;
         default:
            provisionalQuantity = quantity;
            break;
      }
      if (quantityTotal <= numberSlotInTour) {
         if (provisionalQuantity >= 0 && provisionalQuantity <= numberSlotInTour) {
            callBack(provisionalQuantity);
         }
      } else {
         alert('nó lượng cao quá ');
      }
   };

   return (
      <Container>
         <hr />
         <div className={cx('breadcrumb')}>Breadcrumb</div>
         <hr />

         <div className={cx('infor-tour')}>
            <Row gutter={24}>
               <Col span={8}>
                  <Image src="https://media.travel.com.vn/tour/tfd_230222041933_956108.JPG"></Image>
               </Col>
               <Col span={16}>
                  <div className={cx('short-rating')}>
                     <span className={cx('tour-rating')}>9.4</span>
                     <div className={cx('s-comment')}>
                        <h4>Tuyệt vởi</h4>
                        <p>900 quan tâm</p>
                     </div>
                     <div className={cx('s-wishlist')}>
                        <FontAwesomeIcon
                           icon={faHeart}
                           style={{ color: '#fd5056', marginRight: '2px' }}
                           size="2x"
                        ></FontAwesomeIcon>
                        <label>999</label>
                     </div>
                  </div>
                  <h1 className={cx('title')}>
                     Bảo Lộc - Bảo Lâm: Thác Dambri - Tu viện bát nhã - Nghỉ dưỡng Eco Tropicana Garden
                  </h1>
                  <div className={cx('infor-detail-tour')}>
                     <span>
                        Mã Tour <b>NDSGN576-015-161223XE-V</b>
                     </span>
                     <span>
                        Khởi hành <b>16/12/2023</b>
                     </span>
                     <span>
                        Thời gian <b>2 ngày</b>
                     </span>
                     <span>
                        Nơi khởi hành <b>TP. Hồ Chí Minh</b>
                     </span>
                     <span>
                        Số chỗ còn nhận <b>9</b>
                     </span>
                  </div>
               </Col>
            </Row>
         </div>
         <section className={cx('checkout-main')}>
            <Row gutter={24}>
               <Col span={16}>
                  <div className={cx('form-tour')}>
                     <h1>Tổng quan về chuyến đi</h1>
                     <div className={cx('form-infor-contact-customer')}>
                        <h2 className={cx('title')}>Thông tin liên lạc</h2>

                        <Form form={form} layout="vertical" size="large">
                           <Row gutter={24}>
                              <Col span={12}>
                                 <Form.Item required label="Họ và Tên">
                                    <Input type="text" placeholder="vui lòng nhập họ và tên" />
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item required label="Email">
                                    <Input type="text" placeholder="vui lòng nhập email" />
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item required label="Số điện thoại">
                                    <Input type="text" placeholder="vui lòng nhập số điện thoại" />
                                 </Form.Item>
                              </Col>
                              <Col span={12}>
                                 <Form.Item required label="Địa chỉ">
                                    <Input type="text" placeholder="vui lòng nhập địa chỉ" />
                                 </Form.Item>
                              </Col>
                           </Row>
                        </Form>
                     </div>
                     <div className={cx('form-infor-number-customer')}>
                        <h2 className={cx('title')}>Khách Hàng</h2>
                        <Row gutter={[24, 16]}>
                           <Col span={12}>
                              <div className={cx('form-item')}>
                                 <Row justify={'space-between'}>
                                    <Col span={8}>
                                       <div className={cx('change-title')}>
                                          <h3>Người lớn</h3>
                                          <p> {'>'} 12 tuổi</p>
                                       </div>
                                    </Col>
                                    <Col span={8}>
                                       <div className={cx('change-number')}>
                                          <i
                                             className="bi bi-dash-circle"
                                             onClick={() => {
                                                if (quantityAdult <= 1) {
                                                   alert('số lượng khách tối thiểu là 1 ');
                                                } else handleChangeQuantity(setQuantityAdult, quantityAdult, 'minus');
                                             }}
                                             style={{ fontSize: '2.5rem' }}
                                          ></i>
                                          <p className={cx('number-selected')}>{quantityAdult}</p>
                                          <i
                                             className="bi bi-plus-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() =>
                                                handleChangeQuantity(setQuantityAdult, quantityAdult, 'plus')
                                             }
                                          ></i>
                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                           </Col>
                           <Col span={12}>
                              <div className={cx('form-item')}>
                                 <Row justify={'space-between'}>
                                    <Col span={8}>
                                       <div className={cx('change-title')}>
                                          <h3>Trẻ em</h3>
                                          <p>Từ 5 - 11 tuổi</p>
                                       </div>
                                    </Col>
                                    <Col span={8}>
                                       <div className={cx('change-number')}>
                                          <i
                                             className="bi bi-dash-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() =>
                                                handleChangeQuantity(setQuantityChild, quantityChild, 'minus')
                                             }
                                          ></i>
                                          <p className={cx('number-selected')}>{quantityChild}</p>
                                          <i
                                             className="bi bi-plus-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() =>
                                                handleChangeQuantity(setQuantityChild, quantityChild, 'plus')
                                             }
                                          ></i>
                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                           </Col>
                           <Col span={12}>
                              <div className={cx('form-item')}>
                                 <Row justify={'space-between'}>
                                    <Col span={8}>
                                       <div className={cx('change-title')}>
                                          <h3>Trẻ nhỏ</h3>
                                          <p> Từ 2 - 4 tuổi</p>
                                       </div>
                                    </Col>
                                    <Col span={8}>
                                       <div className={cx('change-number')}>
                                          <i
                                             className="bi bi-dash-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() =>
                                                handleChangeQuantity(setQuantityInfant, quantityInfant, 'minus')
                                             }
                                          ></i>
                                          <p className={cx('number-selected')}>{quantityInfant}</p>
                                          <i
                                             className="bi bi-plus-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() =>
                                                handleChangeQuantity(setQuantityInfant, quantityInfant, 'plus')
                                             }
                                          ></i>
                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                           </Col>
                           <Col span={12}>
                              <div className={cx('form-item')}>
                                 <Row justify={'space-between'}>
                                    <Col span={8}>
                                       <div className={cx('change-title')}>
                                          <h3>Em bé</h3>
                                          <p>Từ 0 - 2 tuổi</p>
                                       </div>
                                    </Col>
                                    <Col span={8}>
                                       <div className={cx('change-number')}>
                                          <i
                                             className="bi bi-dash-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() =>
                                                handleChangeQuantity(setQuantityBabe, quantityBabe, 'minus')
                                             }
                                          ></i>
                                          <p className={cx('number-selected')}>{quantityBabe}</p>
                                          <i
                                             className="bi bi-plus-circle"
                                             style={{ fontSize: '2.5rem' }}
                                             onClick={() => handleChangeQuantity(setQuantityBabe, quantityBabe, 'plus')}
                                          ></i>
                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                           </Col>
                        </Row>
                     </div>
                  </div>
                  <div className={cx('customer-notice')}>
                     <div className={cx('customer-notice-left')}>
                        . Người lớn sinh trước ngày <b>01/08/2011</b>
                        <br />. Trẻ nhỏ sinh từ <b>02/08/2018</b> đến <b>01/08/2021</b>
                     </div>
                     <div className={cx('customer-notice-right')}>
                        . Trẻ em sinh từ <b>02/08/2011</b> đến <b>01/08/2018</b>
                        <br />. Em bé sinh từ <b>02/08/2021</b> đến <b>03/08/2023</b>
                     </div>
                  </div>
                  <div className={cx('detail-customer')}>
                     <div className={cx('title')}>Thông Tin Khách Hàng</div>
                  </div>
                  {quantityAdult && <FormInputUser title={'Người lớn'} number={quantityAdult} />}
                  {quantityChild !== 0 && <FormInputUser title={'Trẻ em'} number={quantityChild} />}

                  {quantityInfant !== 0 && <FormInputUser title={'Trẻ con'} number={quantityInfant} />}

                  {quantityBabe !== 0 && <FormInputUser title={'Em bé'} number={quantityBabe} />}
                  <Button> show data</Button>
               </Col>
               <Col span={8}></Col>
            </Row>
         </section>
      </Container>
   );
}

export default BookingForm;
