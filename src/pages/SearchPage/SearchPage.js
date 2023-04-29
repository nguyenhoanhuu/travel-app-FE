import { Row, Col, Select, Switch, Button, Modal, Form } from 'antd';
import classNames from 'classnames/bind';
import style from '~/pages/SearchPage/SearchPage.module.scss';
import { dataSelection as data } from '~/assets/data/tinh-tp';
import RangeSlider from './../../component/RangeSlider/RangeSlider';
import TourCard from '~/component/TourCard/TourCard.js';
import PointOfLocation from '~/component/PointOfLocation/PointOfLocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, React } from 'react';
import * as GetTour from '~/service/GetTour';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const cx = classNames.bind(style);
const listTypeSortTour = [
   {
      value: 1,
      label: '--- Chọn ---',
   },
   {
      value: 2,
      label: 'Theo giá thấp -> cao',
   },
   {
      value: 3,
      label: 'Theo giá cao -> thấp',
   },
   {
      value: 4,
      label: 'Giảm giá nhiều nhất',
   },
];

function SearchPage() {
   const location = useLocation();
   const [typeTour, setTypeTour] = useState('Trong Nước');
   const [listTour, setListTour] = useState([]);
   const [departure, setDeparture] = useState(location.state.departure ? location.state.departure : '');
   const [destination, setDestination] = useState(location.state.destination ? location.state.destination : '');
   const [numberDays, setNumberDays] = useState([
      location.state.startDay ? location.state.startDay : 0,
      location.state.endDay ? location.state.endDay : 0,
   ]);
   const [checkPromotion, setCheckPromotion] = useState(true);
   const [checkSubcriber, setCheckSubscriber] = useState(true);
   const [value1, setValue1] = useState([0, 200000000]);
   const [modal1Open, setModal1Open] = useState(false);
   const handleSubmitSearch = async () => {
      await GetTour.searchTourMultiplyParam(
         'tours/departureordestinationorpriceortype',
         departure,
         destination,
         value1[0],
         value1[1],
         'Trong Nuoc',
         1,
         100,
         'name',
         numberDays[1],
         checkPromotion ? 1 : 0,
         checkSubcriber ? 1 : 0,
      )
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   const choiceNumberDays = (index, numberDay) => {
      if (index === numberDays[0]) {
         setNumberDays([0, 0]);
      } else {
         setNumberDays([index, numberDay]);
      }
   };
   const fetchApi = async () => {
      await GetTour.search('tours/top', 10)
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      if (location.state != null) {
         handleSubmitSearch();
      } else {
         fetchApi();
      }
   }, []);
   const renderFormSearch = () => {
      return (
         <>
            <div className={cx('sidebar-inner')}>
               <div className={cx('tour-search-result-filter-brand')}>
                  <span>Lọc kết quả</span>
               </div>
               <div className={cx('tour-search-result-filter-heading')}>
                  <span>Tất cả</span>
               </div>
            </div>
            <Form>
               <div className={cx('tour-search-form')}>
                  <div className={cx('type-tour')}>
                     <h4 className={cx('s-title')}>LOẠI HÌNH TOUR</h4>
                     <Select
                        showSearch
                        className={cx('selection-type-tour')}
                        value={typeTour}
                        optionFilterProp="children"
                        bordered={false}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={(e) => setTypeTour(e)}
                        options={[
                           {
                              value: 'Trong Nuoc',
                              label: 'Trong Nước',
                           },
                           {
                              value: 'Ngoài Nuoc',
                              label: 'Ngoài Nước',
                           },
                        ]}
                     />
                  </div>
                  <div className={cx('start-to-stop')}>
                     <h4 className={cx('s-title')}>Điểm đi</h4>
                     <Select
                        showSearch
                        options={data}
                        placeholder={'Hồ Chí Minh'}
                        className={cx('select-point-of-departure')}
                        value={departure}
                        onChange={(e) => setDeparture(e)}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                     />
                  </div>
                  <div className={cx('start-to-stop')}>
                     <h4 className={cx('s-title')}>Điểm đến</h4>
                     <Select
                        showSearch
                        options={data}
                        placeholder={'Hồ Chí Minh'}
                        value={destination}
                        onChange={(e) => setDestination(e)}
                        className={cx('select-point-of-departure')}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                     />
                  </div>
                  <div className={cx('choice-number-date')}>
                     <h4 className={cx('s-title')}>Số Ngày</h4>
                     <Row gutter={(16, 16)}>
                        <Col span={12}>
                           <Button
                              className={cx('btn', { selected: numberDays[0] === 1 })}
                              size="large"
                              onClick={() => choiceNumberDays(1, 3)}
                           >
                              3 ngày
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button
                              className={cx('btn', { selected: numberDays[0] === 2 })}
                              size="large"
                              onClick={() => choiceNumberDays(2, 7)}
                           >
                              7 ngày
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button
                              className={cx('btn', { selected: numberDays[0] === 3 })}
                              size="large"
                              onClick={() => choiceNumberDays(3, 10)}
                           >
                              14 ngày
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button
                              className={cx('btn', { selected: numberDays[0] === 4 })}
                              size="large"
                              onClick={() => choiceNumberDays(4, 14)}
                           >
                              trên 14 ngày
                           </Button>
                        </Col>
                     </Row>
                  </div>
                  <div className={cx('choice-lever-tour')}>
                     <h4 className={cx('s-title')}>Dòng Tour</h4>
                     <Row gutter={(16, 16)}>
                        <Col span={12}>
                           <Button className={cx('btn')} size="large">
                              Cao Cấp
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button className={cx('btn')} size="large">
                              Tiêu Chuẩn
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button className={cx('btn')} size="large">
                              tiết Kiệm
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button className={cx('btn')} size="large">
                              Giá tốt
                           </Button>
                        </Col>
                     </Row>
                  </div>
                  <div className={cx('filter-tour')}>
                     <h4 className={cx('s-mark-title')}>Bộ lọc tìm kiếm</h4>
                     <h4 className={cx('s-title')}>Ngân Sách Của Quý Khách</h4>
                     <RangeSlider value1={value1} setValue1={setValue1}></RangeSlider>
                     <h4 className={cx('s-title')}>THÔNG TIN VẬN CHUYỂN</h4>
                     <Row gutter={12} style={{ marginBottom: '20px' }}>
                        <Col span={12}>
                           <Button className={cx('btn')} size="large">
                              Máy Bay
                           </Button>
                        </Col>
                        <Col span={12}>
                           <Button className={cx('btn')} size="large">
                              Ô Tô
                           </Button>
                        </Col>
                     </Row>
                     <h4 className={cx('s-title')}>Hiển Thị Những Chuyến Đi Có</h4>
                     <div className={cx('filter-sale-item')}>
                        <Switch defaultChecked onClick={() => setCheckPromotion(!checkPromotion)}></Switch>
                        <p>Khuyến mãi</p>
                     </div>
                     <div className={cx('filter-sale-item')}>
                        <Switch defaultChecked onClick={() => setCheckSubscriber(!checkSubcriber)}></Switch>
                        <p>Còn chỗ</p>
                     </div>
                  </div>
                  <Button
                     type="primary"
                     onClick={() => {
                        handleSubmitSearch();
                     }}
                  >
                     Tìm Kiếm
                  </Button>
               </div>
            </Form>
         </>
      );
   };
   return (
      <div className={cx('wrapper')}>
         <Row gutter={20}>
            <Col md={{ span: 6 }} sm={{ span: 23 }} xs={{ span: 24 }}>
               {window.innerWidth <= 908 ? (
                  <Modal
                     title="20px to Top"
                     style={{ top: 20 }}
                     open={modal1Open}
                     onCancel={() => setModal1Open(false)}
                  >
                     {renderFormSearch()}
                  </Modal>
               ) : (
                  renderFormSearch()
               )}
            </Col>
            <Col md={{ span: 18 }} sm={{ span: 23 }} xs={{ span: 24 }} style={{ paddingTop: '30px' }}>
               <h1 className={cx('title-header')}>Danh sách tour du lịch khởi hành từ TP. Hồ Chí Minh</h1>
               <hr />
               <Row gutter={20} style={{ marginTop: '50px' }} align={'middle'} justify={'space-between'}>
                  <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 15 }}>
                     <p className={cx('order-by-title')}>
                        Chúng tôi tìm thấy <strong>{listTour && listTour.length}</strong> tours cho Quý khách.
                     </p>
                  </Col>
                  <Col md={{ span: 8 }} sm={{ span: 23 }} xs={{ span: 9 }}>
                     {window.innerWidth >= 908 ? (
                        <Row align={'middle'} justify={'end'}>
                           <p className={cx('order-by-title')}>Sắp xếp theo</p>
                           <Select
                              showSearch
                              style={window.innerWidth >= 908 ? { width: '45%' } : { width: '100%' }}
                              placeholder={'--- Chọn ---'}
                              options={listTypeSortTour}
                              className={cx('select-point-of-departure')}
                              optionFilterProp="children"
                           />
                        </Row>
                     ) : (
                        <Button
                           icon={<i className="bi bi-funnel"></i>}
                           style={{ float: 'right' }}
                           onClick={() => setModal1Open(true)}
                        >
                           Search
                        </Button>
                     )}
                  </Col>
               </Row>
               <div className={cx('list-tour-search')}>
                  <TourCard title="" data={listTour} isSmall={true}></TourCard>
               </div>
               <div className={cx('suggest-title-tour-search')}>
                  <h2>Các tour đang tìm phổ biến</h2>
                  <div className={cx('list-btn-suggest')}>
                     <Button
                        style={{}}
                        className={cx('btn')}
                        icon={<FontAwesomeIcon icon={faSearch} size="lg" className={cx('icon')} />}
                        size="large"
                     >
                        Phan Thiết
                     </Button>
                     <Button
                        style={{}}
                        className={cx('btn')}
                        icon={<FontAwesomeIcon icon={faSearch} size="lg" className={cx('icon')} />}
                        size="large"
                     >
                        Hạ Long
                     </Button>
                     <Button
                        style={{}}
                        className={cx('btn')}
                        icon={<FontAwesomeIcon icon={faSearch} size="lg" className={cx('icon')} />}
                        size="large"
                     >
                        Đà Lạt
                     </Button>
                  </div>
               </div>
               <PointOfLocation title={'Các điểm đến ưa chuộng'} align={'align-left'} num={4}></PointOfLocation>
            </Col>
         </Row>
      </div>
   );
}

export default SearchPage;
