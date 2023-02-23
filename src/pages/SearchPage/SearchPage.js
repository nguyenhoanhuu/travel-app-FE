import { Row, Col, Select } from 'antd';
import classNames from 'classnames/bind';
import style from '~/pages/SearchPage/SearchPage.module.scss';
import { dataSelection as data } from '~/assets/data/tinh-tp';
import { Button } from 'antd';
const cx = classNames.bind(style);
function SearchPage() {
   return (
      <div className={cx('wrapper')}>
         <Row>
            <Col span={6}>
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
                        value={'Hồ Chí Minh'}
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
                        value={'Hồ Chí Minh'}
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
               </div>
            </Col>
            <Col span={18} style={{ background: '#000000', height: '100px' }}></Col>
         </Row>
      </div>
   );
}

export default SearchPage;
