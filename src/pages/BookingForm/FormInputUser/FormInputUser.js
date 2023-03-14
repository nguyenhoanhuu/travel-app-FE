import { Col, DatePicker, Input, Row } from 'antd';
import classNames from 'classnames/bind';

import styles from '~/pages/BookingForm/BookingForm.module.scss';
const cx = classNames.bind(styles);

function FormInputUser({ title, number }) {
   return (
      <div className={cx('infor-adult')}>
         <h2>{title}</h2>
         {Array.from({ length: number }).map((_, index) => {
            return (
               <>
                  <Row key={index} gutter={8} className={cx('form-input-info-adult')}>
                     <Col span={8}>
                        <Input placeholder="Họ và Tên" size="large"></Input>
                     </Col>
                     <Col span={6}>
                        <Input placeholder="Giới tính" size="large"></Input>
                     </Col>
                     <Col span={10}>
                        <DatePicker
                           style={{ width: '100%' }}
                           size="large"
                           placeholder="Ngày Sinh"
                           // defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')}
                           format={'DD/MM/YYYY'}
                        />
                     </Col>
                     <Col span={6}></Col>
                  </Row>
               </>
            );
         })}
      </div>
   );
}
export default FormInputUser;
