import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';

const Shadow = () => {
   const [data, setData] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [selectedRecord, setSelectedRecord] = useState(null);
   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
   const [formData, setFormData] = useState({
      code: '',
      discount: '',
      limit: '',
      expriedDate: null,
   });

   const handleDelete = (record) => {
      setSelectedRecord(record);
      setIsDeleteModalVisible(true);
   };

   const handleUpdate = (record) => {
      console.log(record);
      setSelectedRecord(record);
      setIsUpdateModalVisible(true);
   };
   const handleCancelUpdate = () => {
      setFormData({
         name: '',
         discount: '',
         endDay: null,
      });
      setIsUpdateModalVisible(false);
   };

   const handleOkUpdate = async () => {
      await axios
         .put(`${process.env.REACT_APP_BASE_URL}promotions/update/${selectedRecord.id}`, formData)
         .then((response) => {
            setIsUpdateModalVisible(false);
            alert(response.data.message);
            fetchData();
         })
         .catch((error) => {
            alert(error.response.data.message);
         });
   };

   const columns = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Trạng thái',
         dataIndex: 'active',
         key: 'active',
         render: (text) => <span>{text ? 'Còn hạn' : 'Hết hạn'}</span>,
      },
      {
         title: 'Code',
         dataIndex: 'code',
         key: 'code',
      },
      {
         title: 'Giảm giá',
         dataIndex: 'discount',
         key: 'discount',
         render: (discount) => {
            const formattedPrice = discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            return formattedPrice;
         },
      },
      {
         title: 'Giới hạn',
         dataIndex: 'limit',
         key: 'limit',
      },
      {
         title: 'Ngày hết hạn',
         dataIndex: 'expriedDate',
         key: 'expriedDate',
         render: (expriedDate) => {
           const date = new Date(expriedDate);
           const formattedDate = date.toLocaleDateString('en-GB');
           return formattedDate;
         },
       },       
      {
         title: 'Hành động',
         key: 'action',
         render: (text, record) => (
            <span>
               {/* <Button type="primary" onClick={() => handleUpdate(record)}>
                  Cập nhật
               </Button> */}
               <Button type="dashed" onClick={() => handleDelete(record)} style={{ marginLeft: '10px' }}>
                  Xoá
               </Button>
            </span>
         ),
      },
   ];

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}vouchers`);
      setData(result.data);
   };

   const handleAddPromotion = () => {
      setIsModalVisible(true);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   const handleFormChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleDateChange = (date, dateString) => {
      setFormData({ ...formData, expriedDate: dateString });
   };
   const handleConfirmDelete = async () => {
      await axios
         .delete(`${process.env.REACT_APP_BASE_URL}vouchers/delete/${selectedRecord.id}`)
         .then((response) => {
            // handle response
            setIsDeleteModalVisible(false);
            setSelectedRecord(null);
            fetchData();
         })
         .catch((error) => {
            alert(error.response.data.message);
         });
   };

   const handleCancelDelete = () => {
      setIsDeleteModalVisible(false);
      setSelectedRecord(null);
   };

   const handleOk = async () => {
      if(formData.code.trim() === ''){
         return toast.error("Vui lòng nhập mã code voucher");
      }
      if(formData.discount.trim() === ''){
         return toast.error("Vui lòng nhập số tiền giảm giá voucher");
      }
      if(formData.limit.trim() === ''){
         return toast.error("Vui lòng nhập số lượng voucher");
      }
      if(formData.expriedDate == null){
         return toast.error("Vui lòng nhập ngày hết hạn voucher");
      }
      await axios
         .post(`${process.env.REACT_APP_BASE_URL}vouchers/save`, formData)
         .then((response) => {
            // handle response

            setIsModalVisible(false);
            alert(response.data.message);
            fetchData();
         })
         .catch((error) => {
            alert(error.response.data.message);
         });
   };

   return (
      <>
      <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         // theme="dark"
         />
         <Button type="primary" onClick={handleAddPromotion}>
            Thêm voucher
         </Button>
         <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
         {isModalVisible && (
            <Modal
               title="Thêm voucher"
               visible={isModalVisible}
               onCancel={handleCancel}
               footer={[
                  <Button key="cancel" onClick={handleCancel}>
                     Hủy bỏ
                  </Button>,
                  <Button key="add" type="primary" onClick={handleOk}>
                     Thêm voucher
                  </Button>,
               ]}
            >
               <Form>
                  <Form.Item
                     label="Mã voucher"
                     name="code"
                     rules={[{ required: true, message: 'Mã voucher không được để trống' }]}
                  >
                     <Input name="code" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Giảm giá"
                     name="discount"
                     rules={[
                        {
                           required: true,
                           message: 'Giảm giá không được để trống',
                        },
                        ({ getFieldValue }) => ({
                           validator(_, value) {
                              if (value && value > 0) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(new Error('Giảm giá phải lớn hơn 0'));
                           },
                        }),
                     ]}
                  >
                     <Input type="number" step="50000" name="discount" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Giới hạn"
                     name="limit"
                     rules={[
                        {
                           required: true,
                           message: 'Giới hạn không được để trống',
                        },
                        ({ getFieldValue }) => ({
                           validator(_, value) {
                              if (value && value > 0) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(new Error('Giới hạn phải lớn hơn 0'));
                           },
                        }),
                     ]}
                  >
                     <Input type="number" step="1" name="limit" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Ngày hết hạn"
                     name="expriedDate"
                     rules={[
                        {
                           required: true,
                           message: 'Ngày hết hạn không được bỏ trống',
                        },
                        ({ getFieldValue }) => ({
                           validator(_, value) {
                              if (value && new Date(value) > new Date()) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(new Error('Ngày hết hạn phải trước ngày hiện tại'));
                           },
                        }),
                     ]}
                  >
                     <DatePicker name="expriedDate" onChange={handleDateChange} />
                  </Form.Item>
               </Form>
            </Modal>
         )}

         {isDeleteModalVisible && (
            <Modal
               title="Xác nhận xoá"
               visible={isDeleteModalVisible}
               onOk={handleConfirmDelete}
               onCancel={handleCancelDelete}
               okText="Xác nhận"
               cancelText="Huỷ bỏ"
            >
               <p>Bạn có chắc chắn muốn xoá voucher "{selectedRecord?.code}" không?</p>
            </Modal>
         )}

         {isUpdateModalVisible && (
            <Modal
               title="Cập nhật voucher"
               visible={isUpdateModalVisible}
               onCancel={handleCancelUpdate}
               footer={[
                  <Button key="cancel" onClick={handleCancelUpdate}>
                     Hủy bỏ
                  </Button>,
                  <Button key="update" type="primary" onClick={handleOkUpdate}>
                     Cập nhật khuyến mãi
                  </Button>,
               ]}
            >
               <Form>
                  <Form.Item label="ID" name="id" initialValue={selectedRecord?.id}>
                     <Input disabled />
                  </Form.Item>
                  <Form.Item
                     label="Tên khuyến mãi"
                     name="name"
                     initialValue={selectedRecord?.name}
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập tên khuyến mãi',
                        },
                     ]}
                  >
                     <Input onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Giảm giá"
                     name="discount"
                     initialValue={selectedRecord?.discount}
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập số giảm giá',
                        },
                     ]}
                  >
                     <Input type="number" min={1} onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Ngày hết hạn"
                     name="endday"
                     initialValue={selectedRecord?.endday ? moment(selectedRecord.endday, 'YYYY-MM-DD') : null}
                  >
                     <DatePicker onChange={handleDateChange} />
                  </Form.Item>
               </Form>
            </Modal>
         )}
      </>
   );
};

export default Shadow;
