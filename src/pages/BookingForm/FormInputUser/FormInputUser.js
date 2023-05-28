import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
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
   const nameRegex = /^[\p{L}\s]+$/u;
   return (
      <div className={cx('infor-adult')}>
         <h2>{title}</h2>
         {infor.map((item, index) => {
            return (
               <div key={index}>
                  <Row gutter={8} className={cx('form-input-info-adult')}>
                     <Col span={8}>
                        <Form.Item
                           name={`${title}_name_${index}`}
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập đầy đủ tên khách hàng !',
                              },
                              {
                                 pattern: nameRegex,
                                 message: 'Tên chỉ được chứa chữ cái và khoảng trắng!',
                              },
                           ]}
                        >
                           <Input
                              placeholder="Họ và Tên"
                              size="large"
                              name="name"
                              onBlur={(e) => {
                                 handleFormChange(index, e);
                              }}
                           ></Input>
                        </Form.Item>
                     </Col>
                     <Col span={6}>
                        <Form.Item
                           name={`${title}_gender_${index}`}
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng chọn giới tính khách hàng!',
                              },
                           ]}
                        >
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
                        </Form.Item>
                     </Col>
                     <Col span={10}>
                        <Form.Item
                           name={`${title}_birthDay_${index}`}
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập ngày sinh khách hàng !',
                              },
                           ]}
                        >
                           <DatePicker
                              style={{ width: '100%' }}
                              name="birthDay"
                              size="large"
                              placeholder="Ngày Sinh"
                              format={'DD/MM/YYYY'}
                              onChange={(e, dateString) => {
                                 handleFormChange(index, e, dateString);
                              }}
                           />
                        </Form.Item>
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
