import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import style from '~/component/ImageDetail/ImageDetail.module.scss';
import Image from '../Image/Image';

const cx = classNames.bind(style);

function ImageDetail(listImage) {
   return (
      <div className={cx('wrapper')}>
         {/* <Row justify={'space-between'} gutter={20}>
            <Col span={13}>
               <Image
                  src={'https://media.travel.com.vn/tour/tfd_220404030907_309719.jpg'}
                  className={cx('image')}
               ></Image>
            </Col>
            <Col span={10} pull={1}>
               <Row gutter={16}>
                  <Col span={24}>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Image
                              src={'https://media.travel.com.vn/tour/tfd_220620111828_289122.jpg'}
                              className={cx('image')}
                           ></Image>
                        </Col>
                        <Col span={12}>
                           <Image
                              src={'https://media.travel.com.vn/tour/tfd_220620111828_289122.jpg'}
                              className={cx('image')}
                           ></Image>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={24} style={{ padding: '0', paddingTop: '20px' }}>
                     <Image
                        src={'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg'}
                        className={cx('image')}
                     ></Image>
                  </Col>
               </Row>
            </Col>
         </Row> */}
         <div className={cx('list-item')}>
            <div className={cx('list-item-1')}>
               <Image
                  src={'https://media.travel.com.vn/tour/tfd_220404030907_309719.jpg'}
                  className={cx('image')}
               ></Image>
            </div>
            <div className={cx('list-item-2')}>
               <div className={cx('sub-item-1')}>
                  <Image
                     src={'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg'}
                     className={cx('image')}
                  ></Image>
                  <Image
                     src={'https://media.travel.com.vn/tour/tfd_220620111828_289122.jpg'}
                     className={cx('image')}
                  ></Image>
               </div>
               <div className={cx('sub-item-2')}>
                  <Image
                     src={'https://media.travel.com.vn/tour/tfd_220620112138_790185.jpg'}
                     className={cx('image')}
                  ></Image>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ImageDetail;
