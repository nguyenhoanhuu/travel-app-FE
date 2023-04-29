import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, TimePicker, Upload } from 'antd';
import { useState, useEffect } from 'react';
import { dataSelection as data } from '~/assets/data/tinh-tp';
import vietnamLocate from 'date-fns/locale/vi';
import * as GetTour from '~/service/GetTour';
import { UploadImage } from '../authentication/UploadImage';

const { RangePicker } = DatePicker;
const { Option } = Select;

const formItemLayout = {
   labelCol: {
      xs: {
         span: 24,
      },
      sm: {
         span: 6,
      },
   },
   wrapperCol: {
      xs: {
         span: 24,
      },
      sm: {
         span: 16,
      },
   },
};
const tailFormItemLayout = {
   wrapperCol: {
      xs: {
         span: 24,
         offset: 0,
      },
      sm: {
         span: 16,
         offset: 8,
      },
   },
};
const rangeConfig = {
   rules: [
      {
         type: 'array',
         required: true,
         message: 'Vui lòng chọn ngày đi và ngày kết thúc!',
      },
   ],
};

function FormAddTour({ isshowFormAdd, setIsShowFormAdd }) {
   const [tourGuideName, setTourGuideName] = useState();
   const [policyName, setPolicyName] = useState();
   const [promotionName, setPromotionName] = useState();
   const [fileList, setFileList] = useState([]);
   const listTourGuide = async () => {
      await GetTour.search('tourguides', 'listName')
         .then((data) => {
            setTourGuideName(data);
         })
         .catch((error) => console.log(error));
   };
   const listPromotion = async () => {
      await GetTour.search('promotions', 'listName')
         .then((data) => {
            setPromotionName(data);
         })
         .catch((error) => console.log(error));
   };
   const listPolicy = async () => {
      await GetTour.search('policys', 'listName')
         .then((data) => {
            setPolicyName(data);
         })
         .catch((error) => console.log(error));
   };
   const normFile = (e) => {
      if (Array.isArray(e)) {
         return e;
      }
      return e?.fileList;
   };
   const props = {
      onRemove: (file) => {
         const index = fileList.indexOf(file);
         const newFileList = fileList.slice();
         newFileList.splice(index, 1);
         setFileList(newFileList);
      },
      beforeUpload: (file) => {
         setFileList([...fileList, file]);
         return false;
      },
      fileList,
   };
   console.log(fileList);
   useEffect(() => {
      listTourGuide();
      listPromotion();
      listPolicy();
   }, []);

   const handleCancel = () => {
      setIsShowFormAdd(false);
   };

   const [form] = Form.useForm();
   const onFinish = (values) => {
      UploadImage(fileList, values);
      console.log('Received values of form: ', values);
   };
   const config = {
      rules: [
         {
            type: 'object',
            required: true,
            message: 'Please select time!',
         },
      ],
   };
   const onChange = ({ fileList: newFileList }) => {
      newFileList.forEach((element) => {
         element.status = 'done';
      });
      setFileList(newFileList);
   };
   const handleUpload = () => {
      const listImage = UploadImage(fileList);
   };
   const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
         src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
         });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
   };
   return (
      <Modal
         open={isshowFormAdd}
         onCancel={handleCancel}
         width={window.innerWidth <= 908 ? '100%' : '70%'}
         title="Thêm Tour"
         footer={[
            <>
               <Button key="back" onClick={handleCancel}>
                  Trở lại
               </Button>
               <Button key="submit" type="primary">
                  Thêm
               </Button>
            </>,
         ]}
      >
         <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            // style={{
            //    maxWidth: 600,
            // }}
            scrollToFirstError
         >
            <Form.Item
               name="name"
               label="Tên tour"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập tên của tour!',
                  },
               ]}
            >
               <Input placeholder="Vui lòng nhập tên của tour" />
            </Form.Item>
            <Form.Item name={'image'} label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
               <Upload
                  {...props}
                  onPreview={onPreview}
                  multiple
                  // action="https://api.unsplash.com/photos/?client_id=R2lJs4LxZYmatlxebb67vGyb5vQI6mfvEh-8gCwHihU"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
               >
                  <div>
                     <PlusOutlined />
                     <div
                        style={{
                           marginTop: 8,
                        }}
                     >
                        Upload
                     </div>
                  </div>
               </Upload>
               <Button
                  type="primary"
                  onClick={handleUpload}
                  disabled={fileList.length === 0}
                  style={{
                     marginTop: 16,
                  }}
               >
                  'Start Upload'
               </Button>
            </Form.Item>
            <Form.Item name="departureTime" label="thời gian xuất phát" {...config}>
               <TimePicker />
            </Form.Item>
            <Form.Item
               name="departure"
               label="Điểm đi"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn điểm đi của tour!',
                  },
               ]}
            >
               <Select
                  showSearch
                  placeholder={'Hồ Chí Minh'}
                  options={data}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
               />
            </Form.Item>
            <Form.Item
               name="destination"
               label="Điểm đến"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn điểm đến của tour!',
                  },
               ]}
            >
               <Select
                  showSearch
                  placeholder={'Hồ Chí Minh'}
                  options={data}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
               />
            </Form.Item>
            <Form.Item name="dateSelected" label="Ngày bắt đầu và ngày kết thúc" {...rangeConfig}>
               <RangePicker locale={vietnamLocate} format={['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']} />
            </Form.Item>
            {/* <Form.Item
               name="numberOfDay"
               label="Số ngày"
               rules={[{ required: true, message: 'Vui lòng nhập số ngày!' }]}
            >
               <InputNumber
                  // disabled
                  defaultValue={numberDay}
                  // value={200}
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Vui lòng chọn Số ngày"
               />
            </Form.Item> */}
            <Form.Item
               name="numberOfPeople"
               label="Số lượng khách"
               rules={[{ required: true, message: 'Vui lòng nhập số lượng khách!' }]}
            >
               <InputNumber min={0} style={{ width: '100%' }} placeholder="Vui lòng chọn số lượng khách hàng" />
            </Form.Item>
            <Form.Item name="type" label="Loại tour" rules={[{ required: true, message: 'Vui lòng chọn loại tour!' }]}>
               <Select placeholder="chọn loại tour">
                  <Option value="Trong Nuoc">Trong nước</Option>
                  <Option value="Ngoài Nuoc">Ngoài Nước</Option>
               </Select>
            </Form.Item>
            <Form.Item name="price" label="Giá cả" rules={[{ required: true, message: 'Vui lòng chọn loại tour!' }]}>
               <InputNumber
                  defaultValue={1000}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: '100%' }}
                  addonAfter="VND"
               />
            </Form.Item>
            <Form.Item
               name="tourGuideName"
               label="Tên hướng dẫn viên"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn tên tên hướng dẫn viên của tour!',
                  },
               ]}
            >
               <Select showSearch optionFilterProp="children" key={data.index}>
                  {tourGuideName &&
                     tourGuideName.map((item, index) => {
                        return (
                           <Select.Option key={index} value={item}>
                              {item}
                           </Select.Option>
                        );
                     })}
               </Select>
            </Form.Item>
            <Form.Item
               name="promotionName"
               label="Mã giảm giá cho tour"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn tên mã giảm của tour!',
                  },
               ]}
            >
               <Select showSearch optionFilterProp="children" key={data.index}>
                  {promotionName &&
                     promotionName.map((item, index) => {
                        return (
                           <Select.Option key={index} value={item}>
                              {item}
                           </Select.Option>
                        );
                     })}
               </Select>
            </Form.Item>
            <Form.Item
               name="policyName"
               label="Tên chính sách"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn tên chính sách của tour!',
                  },
               ]}
            >
               <Select showSearch placeholder={''} optionFilterProp="children" key={data.index}>
                  {policyName &&
                     policyName.map((item, index) => {
                        return (
                           <Select.Option key={index} value={item}>
                              {item}
                           </Select.Option>
                        );
                     })}
               </Select>
            </Form.Item>
            {/* <Form.Item
               name="createdBy"
               label="Người tạo"
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng nhập tên người tạo!',
                  },
               ]}
            >
               <Input placeholder="Vui lòng nhập tên người tạo" />
            </Form.Item> */}
            <h3>Lịch trình theo từng ngày</h3>
            <Form.List name="itineraryDetail">
               {(fields, { add, remove }) => (
                  <>
                     {fields.map(({ key, name, ...restField }, index) => (
                        <Space key={key} align="baseline">
                           <h4>{`Ngày ${index + 1}`}</h4>
                           <Form.Item
                              label="Tiêu đề"
                              name={[name, 'title']}
                              {...restField}
                              rules={[
                                 {
                                    required: true,
                                    message: `Vui lòng nhập tiêu đề ngày thứ ${index + 1}!`,
                                 },
                              ]}
                           >
                              <Input />
                           </Form.Item>
                           <Form.Item
                              {...restField}
                              label="mô tả"
                              name={[name, 'description']}
                              rules={[
                                 {
                                    required: true,
                                    message: `Vui lòng nhập mô tả ngày thứ ${index + 1}!`,
                                 },
                              ]}
                           >
                              <Input />
                           </Form.Item>

                           <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                     ))}

                     <Form.Item>
                        <Button
                           type="dashed"
                           style={{ width: '100%' }}
                           onClick={() => add()}
                           block
                           icon={<PlusOutlined />}
                        >
                           thêm ngày
                        </Button>
                     </Form.Item>
                  </>
               )}
            </Form.List>
            <Form.Item {...tailFormItemLayout}>
               <Button type="primary" htmlType="submit">
                  Thêm Tour
               </Button>
            </Form.Item>
         </Form>
      </Modal>
   );
}

export default FormAddTour;
