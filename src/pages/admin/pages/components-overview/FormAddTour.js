import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Rate, Select, Space, TimePicker, Upload } from 'antd';
import { useState, useEffect } from 'react';
import { dataSelection as data } from '~/assets/data/tinh-tp';
import vietnamLocate from 'date-fns/locale/vi';
import * as GetTour from '~/service/GetTour';
import { UploadImage } from '../authentication/UploadImage';
import dayjs from 'dayjs';
const { TextArea } = Input;

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

function FormAddTour({ initData, isShowFormAdd, setIsShowFormAdd, setReloadDb, reloadDb }) {
   console.log(initData);
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
   console.log(fileList);
   // const getInforOfTour = async (id) => {
   //    await GetTour.search('tours', id)
   //       .then((data) => {
   //          setinforOfTour(data);
   //       })
   //       .catch((error) => console.log(error));
   // };
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
   useEffect(() => {
      listTourGuide();
      listPromotion();
      listPolicy();
      // initData && getInforOfTour(initData.id);
   }, []);
   const handleCancel = () => {
      setIsShowFormAdd(false);
   };

   const [form] = Form.useForm();
   const onFinish = (values) => {
      UploadImage(fileList, values, setReloadDb, reloadDb, setIsShowFormAdd, isShowFormAdd);
      console.log('Received values of form: ', values);
      // await setReloadDb(!reloadDb);
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
         open={isShowFormAdd}
         onCancel={handleCancel}
         width={window.innerWidth <= 908 ? '100%' : '70%'}
         title="Thêm Tour"
         footer={[
            <>
               {/* <Button key="back" onClick={handleCancel}>
                  Trở lại
               </Button> */}
               {/* <Button type="primary" htmlType="submit">
                  Thêm Tour
               </Button> */}
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
               initialValue={initData && initData.name}
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
            </Form.Item>
            <Form.Item
               name="departureTime"
               label="thời gian xuất phát"
               {...config}
               initialValue={initData && dayjs(initData.departureTime, 'HH:mm')}
            >
               <TimePicker />
            </Form.Item>
            <Form.Item
               name="departure"
               label="Điểm đi"
               initialValue={initData && initData.departure}
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn điểm đi của tour!',
                  },
               ]}
            >
               <Select
                  showSearch
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
               initialValue={initData && initData.destination}
               rules={[
                  {
                     required: true,
                     message: 'Vui lòng chọn điểm đến của tour!',
                  },
               ]}
            >
               <Select
                  showSearch
                  options={data}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
               />
            </Form.Item>

            <Form.Item
               name="dateSelected"
               label="Ngày bắt đầu và ngày kết thúc"
               {...rangeConfig}
               // initialValue={[
               //    format(new Date('01/01/2015'), 'dd/MM/yyyy'),
               //    format(new Date('01/01/2015'), 'dd/MM/yyyy'),
               // ]}
               initialValue={initData && [dayjs(initData.startDay, 'YYYY-MM-DD'), dayjs(initData.endDay, 'YYYY-MM-DD')]}
            >
               <RangePicker
                  locale={vietnamLocate}
                  format={['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'dd/MM/yyyy']}
               />
            </Form.Item>
            <Form.Item
               initialValue={initData && initData.numberOfPeople}
               name="numberOfPeople"
               label="Số lượng khách"
               rules={[{ required: true, message: 'Vui lòng nhập số lượng khách!' }]}
            >
               <InputNumber min={0} style={{ width: '100%' }} placeholder="Vui lòng chọn số lượng khách hàng" />
            </Form.Item>
            <Form.Item
               name="type"
               label="Loại tour"
               rules={[{ required: true, message: 'Vui lòng chọn loại tour!' }]}
               initialValue={initData && initData.type}
            >
               <Select placeholder="chọn loại tour">
                  <Option value="Trong Nuoc">Trong nước</Option>
                  <Option value="Ngoài Nuoc">Ngoài Nước</Option>
               </Select>
            </Form.Item>
            <Form.Item
               name="price"
               label="Giá cả"
               rules={[{ required: true, message: 'Vui lòng chọn loại tour!' }]}
               initialValue={initData && initData.price}
            >
               <InputNumber
                  // defaultValue={100000}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: '100%' }}
                  addonAfter="VND"
               />
            </Form.Item>
            <Form.Item
               name="descriptionTour"
               label="giới thiệu về tour"
               initialValue={initData && initData.tourDetail && initData.tourDetail.description}
            >
               <TextArea rows={4} />
            </Form.Item>
            <Form.Item
               name="transport"
               label="phương tiện di chuyển"
               rules={[{ required: true, message: 'Vui lòng chọn phương tiện di chuyển!' }]}
               initialValue={initData && initData.tourDetail && initData.tourDetail.transport}
            >
               <Select placeholder="chọn phương tiện di chuyển ">
                  <Option value="xe du lịch">xe du lịch</Option>
                  <Option value="máy bay">máy bay</Option>
                  <Option value="xe máy">xe máy</Option>
                  <Option value="tàu hỏa">tàu hỏa</Option>
                  <Option value="tàu thủy">tàu thủy</Option>
               </Select>
            </Form.Item>
            <Form.Item
               name="starHotel"
               label="số sao khách sạn"
               rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}
               initialValue={initData && initData.tourDetail && initData.tourDetail.starHotel}
            >
               <Rate allowHalf defaultValue={2.5} />
            </Form.Item>
            <Form.Item
               name="tourGuideName"
               label="Tên hướng dẫn viên"
               initialValue={initData && initData.tourGuides[0].name}
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
            <Form.Item name="promotionName" label="Mã giảm giá cho tour">
               <Select
                  showSearch
                  optionFilterProp="children"
                  key={data.index}
                  // initialValue={initData && initData.promotionName}
               >
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
               initialValue={initData && initData.policy.policyName}
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
            <Form.List name="itineraryDetail" style={{ width: '100%' }}>
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
                              <TextArea rows={1} />
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
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <Button key="back" onClick={handleCancel} style={{ marginRight: 10 }}>
                     Trở lại
                  </Button>
                  <Button type="primary" htmlType="submit">
                     Thêm Tour
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </Modal>
   );
}

export default FormAddTour;
