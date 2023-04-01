import { Row, Col, Select, Switch, Button, Modal } from 'antd';
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
   const [listTour, setListTour] = useState([]);
   const [modal1Open, setModal1Open] = useState(false);
   const fetchApi = async () => {
      await GetTour.search('tours/top', 10)
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      fetchApi();
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
            <div className={cx('tour-search-form')}>
               <div className={cx('type-tour')}>
                  <h4 className={cx('s-title')}>LOẠI HÌNH TOUR</h4>
                  <Select
                     showSearch
                     className={cx('selection-type-tour')}
                     value={'Tour trọn gói'}
                     optionFilterProp="children"
                     bordered={false}
                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
                     filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                     }
                     options={[
                        {
                           value: '1',
                           label: '--- Tất cả ---',
                        },
                        {
                           value: '2',
                           label: 'Tour trọn gói',
                        },
                        {
                           value: '3',
                           label: 'Tour gia đình',
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
                        <Button className={cx('btn')} size="large">
                           1-3 ngày
                        </Button>
                     </Col>
                     <Col span={12}>
                        <Button className={cx('btn')} size="large">
                           4-7 ngày
                        </Button>
                     </Col>
                     <Col span={12}>
                        <Button className={cx('btn')} size="large">
                           8-14 ngày
                        </Button>
                     </Col>
                     <Col span={12}>
                        <Button className={cx('btn')} size="large">
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
                  <RangeSlider></RangeSlider>
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
                     <Switch></Switch>
                     <p>Khuyến mãi</p>
                  </div>
                  <div className={cx('filter-sale-item')}>
                     <Switch></Switch>
                     <p>Còn chỗ</p>
                  </div>
               </div>
            </div>
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
                        Chúng tôi tìm thấy <strong>1,787</strong> tours cho Quý khách.
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
