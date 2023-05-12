import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Option2 = () => {
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
         endday: null,
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
         title: 'Tên hướng dẫn viên',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Địa chỉ',
         dataIndex: 'address',
         key: 'address',
      },
      {
         title: 'Số điện thoại',
         dataIndex: 'phone',
         key: 'phone',
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
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
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}tourguides`);
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
      await axios
         .post(`${process.env.REACT_APP_BASE_URL}tourguides/save`, formData)
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
            Thêm hướng dẫn viên du lịch
         </Button>
         <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
         {isModalVisible && (
            <Modal
               title="Thêm hướng dẫn viên du lịch"
               open={isModalVisible}
               onCancel={handleCancel}
               footer={[
                  <Button key="cancel" onClick={handleCancel}>
                     Hủy bỏ
                  </Button>,
                  <Button key="add" type="primary" onClick={handleOk}>
                     Thêm HDV
                  </Button>,
               ]}
            >
               <Form>
                  <Form.Item
                     label="Tên hướng dẫn viên"
                     name="name"
                     rules={[{ required: true, message: 'Tên hướng dẫn viên không được để trống' }]}
                  >
                     <Input name="name" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Địa chỉ"
                     name="address"
                     rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
                  >
                     <Input name="address" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Số điện thoại"
                     name="phone"
                     rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                  >
                     <Input type="number" name="phone" onChange={handleFormChange} />
                  </Form.Item>
                  <Form.Item
                     label="Email"
                     name="email"
                     rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                  >
                     <Input name="email" onChange={handleFormChange} />
                  </Form.Item>
               </Form>
            </Modal>
         )}

         {isDeleteModalVisible && (
            <Modal
               title="Xác nhận xoá"
               open={isDeleteModalVisible}
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

export default Option2;
