import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
import Container from '@mui/material/Container';
import { Row, Col, Image, Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMailForward, faPhone } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import FormInputUser from './FormInputUser/FormInputUser';
import { Checkbox, FormControlLabel } from '@mui/material';
import suggest from '~/assets/data/infor-suggest';
import TextArea from 'antd/es/input/TextArea';

const cx = classNames.bind(styles);

function BookingForm() {
   const numberSlotInTour = 9;
   const [quantityAdult, setQuantityAdult] = useState([
      {
         name: '',
         gender: '',
         birthDay: '',
      },
   ]);
   const [quantityChild, setQuantityChild] = useState([]);
   const [quantityInfant, setQuantityInfant] = useState([]);
   const [quantityBabe, setQuantityBabe] = useState([]);

   const [form] = Form.useForm();
   const handleChangeQuantity = (callBack, quantity, action) => {
      let provisionalQuantity;
      let quantityTotal;
      switch (action) {
         case 'minus':
            provisionalQuantity = [...quantity];
            provisionalQuantity.splice(quantity.length - 2, 1);
            console.log(provisionalQuantity);
            quantityTotal =
               quantityAdult.length + quantityBabe.length + quantityChild.length + quantityInfant.length - 1;
            break;
         case 'plus':
            let newField = {
               name: '',
               gender: '',
               birthDay: '',
            };
            provisionalQuantity = [...quantity, newField];
            console.log(provisionalQuantity);

            quantityTotal =
               quantityAdult.length + quantityBabe.length + quantityChild.length + quantityInfant.length + 1;
            break;
         default:
            provisionalQuantity = quantity;
            break;
      }
      if (quantityTotal <= numberSlotInTour) {
         if (provisionalQuantity.length >= 0 && provisionalQuantity.length <= numberSlotInTour) {
            callBack(provisionalQuantity);
         }
      } else {
         alert('nó lượng cao quá ');
      }
   };
   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
                                                if (quantityAdult.length <= 1) {
                                                   alert('số lượng khách tối thiểu là 1 ');
                                                } else handleChangeQuantity(setQuantityAdult, quantityAdult, 'minus');
                                             }}
                                             style={{ fontSize: '2.5rem' }}
                                          ></i>
                                          <p className={cx('number-selected')}>{quantityAdult.length}</p>
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
                                          <p className={cx('number-selected')}>{quantityChild.length}</p>
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
                                          <p className={cx('number-selected')}>{quantityInfant.length}</p>
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
                                          <p className={cx('number-selected')}>{quantityBabe.length}</p>
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
                  <div className={cx('form-infor-contact-customer')}>
                     {quantityAdult && (
                        <FormInputUser title={'Người lớn'} callback={setQuantityAdult} infor={quantityAdult} />
                     )}
                     {quantityChild.length !== 0 && (
                        <FormInputUser title={'Trẻ em'} callback={setQuantityChild} infor={quantityChild} />
                     )}

                     {quantityInfant.length !== 0 && (
                        <FormInputUser title={'Trẻ con'} callback={setQuantityInfant} infor={quantityInfant} />
                     )}

                     {quantityBabe.length !== 0 && (
                        <FormInputUser title={'Em bé'} callback={setQuantityBabe} infor={quantityBabe} />
                     )}
                     <Button onClick={() => console.log([quantityAdult, quantityChild, quantityInfant, quantityBabe])}>
                        show data
                     </Button>
                  </div>
                  <div className={cx('detail-customer')}>
                     <h2 className={cx('title')}>Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi !</h2>
                  </div>
                  <div className={cx('form-infor')}>
                     {suggest.map((item, index) => {
                        return (
                           <div key={index} className={cx('infor-contact-item')}>
                              <Checkbox
                                 label="checkbox"
                                 name={item}
                                 defaultChecked
                                 sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />
                              <label htmlFor={item}>{item}</label>
                           </div>
                        );
                     })}
                  </div>
                  <div className={cx('form-infor')}>
                     <p>ghi chú thêm</p>
                     <TextArea
                        style={{ marginTop: '10px' }}
                        rows={4}
                        placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Anh hoặc tiếng Việt"
                     />
                  </div>
               </Col>
               <Col span={8}>
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
                  <div className={cx('group-abbreviate-tour')}>
                     <h2 className={cx('title-abbreviate')}>Tóm Tắt Chuyến Đi</h2>
                     <p>
                        <strong>Tour trọn gói</strong> (3 khách)
                     </p>
                  </div>
               </Col>
            </Row>
         </section>
      </Container>
   );
}

export default BookingForm;
