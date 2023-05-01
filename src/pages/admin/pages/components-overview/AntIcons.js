import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const AntIcons = () => {
   const [data, setData] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [selectedRecord, setSelectedRecord] = useState(null);
   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      discount: '',
      endday: null,
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
         endday: null,
      });
      setIsUpdateModalVisible(false);
   };

   const handleOkUpdate = async () => {
      await axios
         .put(`http://localhost:8080/promotions/update/${selectedRecord.id}`, formData)
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
         title: 'Tên khuyến mãi',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Giảm giá',
         dataIndex: 'discount',
         key: 'discount',
      },
      {
         title: 'Ngày hết hạn',
         dataIndex: 'endday',
         key: 'endday',
      },
      {
         title: 'Hành động',
         key: 'action',
         render: (text, record) => (
            <span>
               <Button type="primary" onClick={() => handleUpdate(record)}>
                  Cập nhật
               </Button>
               <Button type="danger" onClick={() => handleDelete(record)} style={{ marginLeft: '10px' }}>
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
      const result = await axios.get('http://localhost:8080/promotions');
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
      setFormData({ ...formData, endday: dateString });
   };
   const handleConfirmDelete = async () => {
      await axios
         .delete(`http://localhost:8080/promotions/delete/${selectedRecord.id}`)
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
      await axios
         .post('http://localhost:8080/promotions/save', formData)
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
         <Button type="primary" onClick={handleAddPromotion}>
            Thêm khuyến mãi
         </Button>
         <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
         {isModalVisible && (
            <Modal
               title="Thêm khuyến mãi"
               visible={isModalVisible}
               onCancel={handleCancel}
               footer={[
                  <Button key="cancel" onClick={handleCancel}>
                     Hủy bỏ
                  </Button>,
                  <Button key="add" type="primary" onClick={handleOk}>
                     Thêm khuyến mãi
                  </Button>,
               ]}
            >
               <Form>
                  <Form.Item
                     label="Tên khuyến mãi"
                     name="name"
                     rules={[{ required: true, message: 'Tên khuyến mãi không được để trống' }]}
                  >
                     <Input name="name" onChange={handleFormChange} />
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
                     <Input type="number" step="0.01" name="discount" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Ngày hết hạn"
                     name="endday"
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
                     <DatePicker name="endday" onChange={handleDateChange} />
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
               <p>Bạn có chắc chắn muốn xoá khuyến mãi "{selectedRecord?.name}" không?</p>
            </Modal>
         )}

         {isUpdateModalVisible && (
            <Modal
               title="Cập nhật khuyến mãi"
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
                  {selectedRecord?.id}
                  {selectedRecord?.name}
                  {selectedRecord?.discount}
                  {selectedRecord?.endday}
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

export default AntIcons;
