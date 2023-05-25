import { Form, Input, Button, DatePicker, Select, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { data } from '~/assets/data/tinh-tp';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
function RequestTour() {
   const { Option } = Select;
   const [form] = Form.useForm();

   const onFinish = async (values) => {
      console.log(values);
      const startDate = values.startDate.format('YYYY-MM-DD');
      const endDate = values.endDate.format('YYYY-MM-DD');
      const createAt = moment().format('YYYY-MM-DD');
      const updateAt = moment().format('YYYY-MM-DD');
      const data = {
         departure: values.departure,
         destination: values.destination,
         price: parseFloat(values.price),
         numberOfPeople: parseInt(values.numberofpeople),
         type: values.type === 'Trong nước' ? 'Truong Nuoc' : 'Ngoai Nuoc',
         startDate,
         endDate,
         createAt,
         updateAt,
         status: values.status,
         itinerarys: values.itineraryDetail,
      };
      const token = localStorage.getItem('token');
      await axios
         .post(`${process.env.REACT_APP_BASE_URL}requesttravel/save`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((response) => {
            console.log(response);
            form.resetFields();
            alert(response.data.message);
         })
         .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
         });
   };

   return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Form form={form} onFinish={onFinish} style={{ width: '50%', padding: '0 2rem' }}>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
               <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#f5222d' }}>
                  Lưu ý: Chỉ được phép duyệt cho tour với số lượng từ 15 người trở lên.
               </p>
            </div>
            <Form.Item
               label="Điểm đi"
               name="departure"
               rules={[{ required: true, message: 'Điểm đi không được để trống' }]}
            >
               <Select placeholder="Chọn điểm đi">
                  {data.map((item) => (
                     <Option value={item.name} key={item.code}>
                        {item.name}
                     </Option>
                  ))}
               </Select>
            </Form.Item>
            <Form.Item
               label="Điểm điến"
               name="destination"
               rules={[{ required: true, message: 'Điểm đến không được để trống' }]}
            >
               <Select placeholder="Chọn điểm điến">
                  {data.map((item) => (
                     <Option value={item.name} key={item.code}>
                        {item.name}
                     </Option>
                  ))}
               </Select>
            </Form.Item>

            <Form.Item
               label="Giá tour"
               name="price"
               rules={[
                  {
                     required: true,
                     validator: (_, value) => {
                        const regex = /^[1-9]\d*$/;
                        if (!value || regex.test(value)) {
                           return Promise.resolve();
                        }
                        return Promise.reject('Số lượng người phải là một số nguyên dương lớn hơn 0.');
                     },
                  },
               ]}
               validateTrigger={['onChange', 'onBlur']}
            >
               <Input type="number" defaultValue={5000000} step={100000} />
            </Form.Item>

            <Form.Item
               label="Số lượng người"
               name="numberofpeople"
               rules={[
                  {
                     required: true,
                     validator: (_, value) => {
                        const regex = /^[1-9]\d*$/;

                        if (!value || regex.test(value)) {
                           return Promise.resolve();
                        }
                        return Promise.reject('Số lượng người phải là một số nguyên dương lớn hơn 0.');
                     },
                  },
               ]}
               validateTrigger={['onChange', 'onBlur']}
            >
               <Input type="number" defaultValue={10} step={2} />
            </Form.Item>

            <Form.Item
               label="Loại tour"
               name="type"
               rules={[{ required: true, message: 'Loại tour không được để trống' }]}
            >
               <Select>
                  <Select.Option value="Trong nước">Trong nước</Select.Option>
                  <Select.Option value="Ngoài nước">Ngoài nước</Select.Option>
               </Select>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'left' }}>
               <Form.Item
                  label="Ngày đi"
                  name="startDate"
                  rules={[
                     {
                        required: true,
                        message: 'Ngày đi không được để trống',
                     },
                  ]}
               >
                  <DatePicker
                     format="DD/MM/YYYY"
                     disabledDate={(current) => {
                        return current && current < moment().startOf('day');
                     }}
                  />
               </Form.Item>
               <Form.Item
                  label="Ngày về"
                  name="endDate"
                  rules={[
                     { required: true, message: 'Ngày về không được để trống' },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('startDate') <= value) {
                              return Promise.resolve();
                           }
                           return Promise.reject('Ngày về phải sau ngày đi');
                        },
                     }),
                  ]}
                  style={{ marginLeft: '70px' }}
               >
                  <DatePicker
                     format="DD/MM/YYYY"
                     disabledDate={(current) => {
                        return current && current < moment().startOf('day');
                     }}
                  />
               </Form.Item>
            </div>

            <Form.List name="itineraryDetail" style={{ width: '100%' }}>
               {(fields, { add, remove }) => (
                  <>
                     {fields.map(({ key, name, ...restField }, index) => (
                        <Space key={key} align="baseline">
                           <div style={{ width: '670px', height: '170px', display: 'flex' }}>
                              <section style={{ width: '600px', height: '70px' }}>
                                 <article style={{ width: '600px', height: '70px' }}>
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
                                       <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                 </article>
                                 <article style={{ width: '600px', height: '70px' }}>
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
                                       <TextArea rows={1} style={{ height: '70px' }} />
                                    </Form.Item>
                                 </article>
                              </section>
                              <aside
                                 style={{
                                    width: '70px',
                                    height: '140px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                 }}
                              >
                                 <MinusCircleOutlined onClick={() => remove(name)} />
                              </aside>
                           </div>
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
                           Thêm ngày
                        </Button>
                     </Form.Item>
                  </>
               )}
            </Form.List>

            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Gửi yêu cầu
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
}

export default RequestTour;
