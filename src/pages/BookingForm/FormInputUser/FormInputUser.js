import { Col, DatePicker, Input, Row, Select } from 'antd';
import classNames from 'classnames/bind';

import styles from '~/pages/BookingForm/BookingForm.module.scss';
import { useDebounce } from '~/Hooks';
const cx = classNames.bind(styles);

function FormInputUser({ title, infor, callback }) {
   const handleFormChange = (index, event, value, isGender) => {
      let data = [...infor];
      isGender
         ? (data[index].gender = value)
         : value
         ? (data[index].birthDay = value)
         : (data[index][event.target.name] = event.target.value);

      callback(data);
   };
   return (
      <div className={cx('infor-adult')}>
         <h2>{title}</h2>
         {infor.map((item, index) => {
            return (
               <div key={index}>
                  <Row gutter={8} className={cx('form-input-info-adult')}>
                     <Col span={8}>
                        <Input
                           placeholder="Họ và Tên"
                           size="large"
                           name="name"
                           onBlur={(e) => {
                              handleFormChange(index, e);
                           }}
                        ></Input>
                     </Col>
                     <Col span={6}>
                        {/* <Input
                           placeholder="Giới tính"
                           name="gender"
                           size="large"
                           onChange={(e) => {
                              handleFormChange(index, e);
                           }}
                        ></Input> */}
                        <Select
                           size="large"
                           placeholder="Giới tính"
                           style={{
                              width: 120,
                           }}
                           onChange={(e) => {
                              handleFormChange(index, e, e, true);
                           }}
                           name="gender"
                           options={[
                              {
                                 value: 'Nam',
                                 label: 'Nam',
                              },
                              {
                                 value: 'Nữ',
                                 label: 'Nữ',
                              },
                              {
                                 value: 'Khác',
                                 label: 'Khác',
                              },
                           ]}
                        />
                     </Col>
                     <Col span={10}>
                        <DatePicker
                           style={{ width: '100%' }}
                           name="birthDay"
                           size="large"
                           placeholder="Ngày Sinh"
                           // defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')}
                           format={'DD/MM/YYYY'}
                           onChange={(e, dateString) => {
                              handleFormChange(index, e, dateString);
                           }}
                        />
                     </Col>
                     <Col span={6}></Col>
                  </Row>
               </div>
            );
         })}
      </div>
   );
}
export default FormInputUser;
