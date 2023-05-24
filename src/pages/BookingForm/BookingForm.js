import classNames from 'classnames/bind';
import styles from '~/pages/BookingForm/BookingForm.module.scss';
import Container from '@mui/material/Container';
import { Row, Col, Image, Form, Input, Button, Timeline } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMailForward, faPhone } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import FormInputUser from './FormInputUser/FormInputUser';
import { Checkbox } from '@mui/material';
import suggest from '~/assets/data/infor-suggest';
import TextArea from 'antd/es/input/TextArea';
import { TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { useParams } from 'react-router-dom';
import * as GetTour from '~/service/GetTour';
import { format } from 'date-fns';
import vietnamLocate from 'date-fns/locale/vi';
import BookingModal from './BookingModal/BookingModal';
import { toast, ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);
function BookingForm() {
   const { tourId } = useParams();
   const [tourSelected, setTourSelected] = useState();
   const [quantityChild, setQuantityChild] = useState([]);
   const [quantityInfant, setQuantityInfant] = useState([]);
   const [quantityBabe, setQuantityBabe] = useState([]);
   const [quantityAdult, setQuantityAdult] = useState([
      {
         index: 1,
         name: '',
         gender: '',
         birthDay: '',
      },
   ]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [note, setNote] = useState([]);
   const [noteMore, setNoteMore] = useState();
   const [form] = Form.useForm();
   // const userName = Form.useWatch('userName', form);
   // const address = Form.useWatch('address', form);
   // const email = Form.useWatch('email', form);
   // const phoneNumber = Form.useWatch('phoneNumber', form);
   const [user, setUser] = useState();

   const getInforUser = async () => {
      await GetTour.search('/customer', window.localStorage.getItem('id'))
         .then((data) => {
            setUser(data);
         })
         .catch((error) => console.log(error));
   };
   const [voucherText, setVoucherText] = useState();
   const [voucherPrice, setVoucherPrice] = useState({
      message: '',
      price: 0,
      status: false,
   });

   useEffect(() => {
      tourSelected &&
         setTotalPrice(
            quantityAdult.length * tourSelected.adultPrice +
               quantityChild.length * tourSelected.childPrice +
               quantityInfant.length * tourSelected.childPrice +
               quantityBabe.length * tourSelected.babyPrice -
               voucherPrice.price,
         );
   }, [quantityAdult, quantityBabe, quantityChild, quantityInfant, voucherPrice]);
   const getTourById = async (tourId) => {
      await GetTour.search('/tours', tourId)
         .then((data) => {
            setTourSelected(data);
         })
         .catch((error) => console.log(error));
   };
   const handleAddCheckBox = (ischecked, value) => {
      switch (ischecked) {
         case true:
            setNote([...note, value]);
            break;
         case false:
            setNote(note.filter((item) => item !== value));
            break;
         default:
            break;
      }
   };
   const handleVoucher = async () => {
      await GetTour.searchParamUrl('vouchers/checVoucher', `code=${voucherText}`).then((data) => {
         setVoucherPrice(data);
         toast(data.message);
      });
   };
   const handleChangeQuantity = (callBack, quantity, action) => {
      let provisionalQuantity;
      let quantityTotal;
      switch (action) {
         case 'minus':
            provisionalQuantity = [...quantity];
            provisionalQuantity.splice(quantity.length - 2, 1);
            quantityTotal =
               quantityAdult.length + quantityBabe.length + quantityChild.length + quantityInfant.length - 1;
            break;
         case 'plus':
            let newField = {
               index: '',
               name: '',
               gender: '',
               birthDay: '',
            };
            newField.index = quantity.length + 1;
            provisionalQuantity = [...quantity, newField];

            quantityTotal =
               quantityAdult.length + quantityBabe.length + quantityChild.length + quantityInfant.length + 1;
            break;
         default:
            provisionalQuantity = quantity;
            break;
      }
      if (quantityTotal <= tourSelected.numberOfPeople - tourSelected.subcriber) {
         if (
            provisionalQuantity.length >= 0 &&
            provisionalQuantity.length <= tourSelected.numberOfPeople - tourSelected.subcriber
         ) {
            callBack(provisionalQuantity);
         }
      } else {
         toast.warning('Số lượng đã vượt quá số lượng chỗ trống của tour');
      }
   };
   useEffect(() => {
      getTourById(tourId);
      getInforUser();
   }, []);

   const showPrice = (quantity, price) => {
      return quantity <= 0 ? '0' : quantity + ' x ' + price.toLocaleString();
   };
   return (
      <>
         <Container>
            <ToastContainer
               position="bottom-right"
               autoClose={4000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               // theme="dark"
            />
            <div className={cx('infor-tour')}>
               <Row gutter={24}>
                  <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                     <Image
                        className={cx('image')}
                        src={tourSelected && tourSelected.images && tourSelected.images[0]}
                     ></Image>
                  </Col>
                  <Col md={{ span: 16 }} sm={{ span: 23 }} xs={{ span: 24 }} style={{ margin: '20px 0' }}>
                     <div className={cx('short-rating')}>
                        <span className={cx('tour-rating')}>9.4</span>
                        <div className={cx('s-comment')}>
                           <h4>Tuyệt vởi</h4>
                           {tourSelected && <p>{tourSelected.liked} quan tâm</p>}
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
                     <h1 className={cx('title')}>{tourSelected && tourSelected.name}</h1>
                     <div className={cx('infor-detail-tour')}>
                        <span>
                           Mã Tour <b>{tourSelected && tourSelected.id}</b>
                        </span>
                        <span>
                           Khởi hành <b>{tourSelected && format(new Date(tourSelected.startDay), 'dd/MM/yyyy')}</b>
                        </span>
                        <span>
                           Thời gian <b>{tourSelected && tourSelected.numberOfDay} ngày</b>
                        </span>
                        <span>
                           Nơi khởi hành <b>{tourSelected && tourSelected.departure}</b>
                        </span>
                        <span>
                           Số chỗ còn nhận <b>{tourSelected && tourSelected.numberOfPeople - tourSelected.subcriber}</b>
                        </span>
                     </div>
                  </Col>
               </Row>
            </div>
            <section className={cx('checkout-main')}>
               <Row gutter={24}>
                  <Col md={{ span: 16 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                     <div className={cx('form-tour')}>
                        <h1>Tổng quan về chuyến đi</h1>
                        <div className={cx('form-infor-contact-customer')}>
                           <h2 className={cx('title')}>Thông tin liên lạc</h2>

                           <Form form={form} layout="vertical" size="large">
                              <Row gutter={24}>
                                 {user && (
                                    <>
                                       <Col span={12}>
                                          <Form.Item
                                             required
                                             label="Họ và Tên"
                                             name="userName"
                                             initialValue={user && user.name}
                                          >
                                             <Input type="text" disabled placeholder="vui lòng nhập họ và tên" />
                                          </Form.Item>
                                       </Col>
                                       <Col span={12}>
                                          <Form.Item
                                             required
                                             label="Email"
                                             name="email"
                                             initialValue={user && user.email}
                                          >
                                             <Input type="text" disabled placeholder="vui lòng nhập email" />
                                          </Form.Item>
                                       </Col>
                                       <Col span={12}>
                                          <Form.Item
                                             required
                                             label="Số điện thoại"
                                             name="phoneNumber"
                                             initialValue={user && user.phone}
                                          >
                                             <Input type="text" disabled placeholder="vui lòng nhập số điện thoại" />
                                          </Form.Item>
                                       </Col>
                                    </>
                                 )}
                                 {/* <Col span={12}>
                                    <Form.Item required label="Địa chỉ" name="address">
                                       <Input type="text" placeholder="vui lòng nhập địa chỉ" />
                                    </Form.Item>
                                 </Col> */}
                              </Row>
                           </Form>
                        </div>
                        <div className={cx('form-infor-number-customer')}>
                           <h2 className={cx('title')}>Khách Hàng</h2>
                           <Row gutter={[24, 16]}>
                              <Col span={12}>
                                 <div className={cx('form-item')}>
                                    <Row justify={'space-between'}>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                                          <div className={cx('change-title')}>
                                             <h3>Người lớn</h3>
                                             <p> {'>'} 12 tuổi</p>
                                          </div>
                                       </Col>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                                          <div className={cx('change-number')}>
                                             <i
                                                className="bi bi-dash-circle"
                                                onClick={() => {
                                                   if (quantityAdult.length <= 1) {
                                                      alert('số lượng khách tối thiểu là 1 ');
                                                   } else
                                                      handleChangeQuantity(setQuantityAdult, quantityAdult, 'minus');
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
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                                          <div className={cx('change-title')}>
                                             <h3>Trẻ em</h3>
                                             <p>Từ 5 - 11 tuổi</p>
                                          </div>
                                       </Col>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
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
                              {/* <Col span={12}>
                                 <div className={cx('form-item')}>
                                    <Row justify={'space-between'}>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                                          <div className={cx('change-title')}>
                                             <h3>Trẻ nhỏ</h3>
                                             <p> {'<'} 4 tuổi</p>
                                          </div>
                                       </Col>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
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
                              </Col> */}
                              <Col span={12}>
                                 <div className={cx('form-item')}>
                                    <Row justify={'space-between'}>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
                                          <div className={cx('change-title')}>
                                             <h3>Em bé</h3>
                                             <p>Từ 0 - 2 tuổi</p>
                                          </div>
                                       </Col>
                                       <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
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
                                                onClick={() =>
                                                   handleChangeQuantity(setQuantityBabe, quantityBabe, 'plus')
                                                }
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
                           . Người lớn sinh trước ngày <b>28/05/2011</b>
                           {/* <br />. Trẻ nhỏ sinh từ <b>29/05/2018</b> đến <b>28/05/2021</b> */}
                        </div>
                        <div className={cx('customer-notice-right')}>
                           . Trẻ em sinh từ <b>29/05/2011</b> đến <b>28/05/2021</b>
                           {/* Trẻ em sinh từ <b>29/05/2011</b> trở đi */}
                           <br />. Em bé sinh từ <b>29/05/2021</b> trở đi
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
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    onChange={(e) => handleAddCheckBox(e.target.checked, item)}
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
                           onChange={(e) => setNoteMore(e.target.value)}
                        />
                     </div>
                  </Col>
                  <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 24 }}>
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
                        <Row gutter={16} className={cx('abbreviate-tour-content')}>
                           <Col span={9}>
                              <Image
                                 className={cx('image', 'content')}
                                 src={tourSelected && tourSelected.images && tourSelected.images[0]}
                              ></Image>
                           </Col>
                           <Col span={15}>
                              <p className={cx('title-content')}>{tourSelected && tourSelected.name}</p>
                           </Col>
                        </Row>
                        <div style={{ position: 'relative', height: 200 }}>
                           <Timeline style={{ fontSize: '2rem', color: '#2d4271' }}>
                              <TimelineItem>
                                 <TimelineOppositeContent sx={{ display: 'none' }}></TimelineOppositeContent>
                                 <TimelineSeparator>
                                    <i className="bi bi-calendar4-week"></i>
                                    <TimelineConnector sx={{ minHeight: 70 }} />
                                 </TimelineSeparator>
                                 <TimelineContent style={{ flex: 6, fontSize: '2rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>
                                       Bắt đầu chuyến đi
                                       <p>
                                          <strong style={{ fontSize: '1.7rem' }}>
                                             {/* T4, 22 Tháng 3, 2023 */}
                                             {tourSelected &&
                                                format(new Date(tourSelected.startDay), 'eeee dd MMMM,yyyy', {
                                                   locale: vietnamLocate,
                                                })}
                                          </strong>
                                       </p>
                                    </span>
                                 </TimelineContent>
                              </TimelineItem>
                              <TimelineItem>
                                 <TimelineOppositeContent sx={{ display: 'none' }}></TimelineOppositeContent>
                                 <TimelineSeparator>
                                    <i className=" bi bi-calendar4-week"></i>
                                 </TimelineSeparator>
                                 <TimelineContent style={{ flex: 6 }}>
                                    <span style={{ fontSize: '1.5rem' }}>
                                       Kết thúc chuyến đi
                                       <p>
                                          <strong style={{ fontSize: '1.7rem' }}>
                                             {tourSelected &&
                                                format(new Date(tourSelected.endDay), ' eeee dd MMMM,yyyy', {
                                                   locale: vietnamLocate,
                                                })}
                                          </strong>
                                       </p>
                                    </span>
                                 </TimelineContent>
                              </TimelineItem>
                           </Timeline>
                        </div>
                        <div className={cx('collect-infor-customer')}>
                           <div className={cx('collect-item')}>
                              <h4>Hành Khách</h4>
                              <div>
                                 <i className="bi bi-people-fill fa-2x"></i>
                                 <span>1</span>
                              </div>
                           </div>
                           <div className={cx('collect-item')}>
                              <p>Người lớn</p>
                              <strong>
                                 {tourSelected &&
                                    quantityAdult.length + ' x ' + tourSelected.adultPrice.toLocaleString()}
                                 ₫
                              </strong>
                           </div>
                           <div className={cx('collect-item')}>
                              <p>Trẻ em</p>
                              <strong>
                                 {tourSelected && showPrice(quantityChild.length, tourSelected.childPrice)}₫
                              </strong>
                           </div>
                           {/* <div className={cx('collect-item')}>
                              <p>Trẻ nhỏ</p>
                              <strong>
                                 {tourSelected && showPrice(quantityInfant.length, tourSelected.childPrice)}₫
                              </strong>
                           </div> */}
                           <div className={cx('collect-item')}>
                              <p>Em bé</p>
                              <strong>{tourSelected && showPrice(quantityBabe.length, tourSelected.babyPrice)}₫</strong>
                           </div>
                           {voucherPrice && voucherPrice.price !== 0 && (
                              <div className={cx('collect-item')}>
                                 <p>Giá giảm</p>
                                 <strong>-{voucherPrice.price.toLocaleString()}₫</strong>
                              </div>
                           )}
                           <div className={cx('collect-item')}>
                              <h4>Mã giảm giá</h4>
                              <div className={cx('input-voucher')}>
                                 <Input
                                    placeholder="nhập mã giảm giá"
                                    style={{ width: '50%', marginRight: 2 }}
                                    value={voucherText}
                                    onChange={(e) => {
                                       setVoucherText(e.target.value);
                                    }}
                                 ></Input>
                                 <Button className={cx('btn-add-voucher', 'btn')} size="large" onClick={handleVoucher}>
                                    Áp Dụng
                                 </Button>
                              </div>
                           </div>
                        </div>
                        <hr />
                        <div className={cx('collect-item')}>
                           <h3>TỔNG CỘNG</h3>
                           <p className={cx('total-price')}>{totalPrice.toLocaleString()}₫</p>
                        </div>
                        <div className={cx('btn-submit-tour')} onClick={() => setIsOpenModal(!isOpenModal)}>
                           Đặt ngay
                        </div>
                     </div>
                  </Col>
               </Row>
            </section>
         </Container>
         <BookingModal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            listInforCustomer={[quantityAdult, quantityChild, quantityInfant, quantityBabe]}
            inforContact={user && user}
            note={note}
            noteMore={noteMore}
            inforTour={tourSelected}
            voucherCode={voucherText}
            totalPrice={totalPrice}
         ></BookingModal>
      </>
   );
}

export default BookingForm;
