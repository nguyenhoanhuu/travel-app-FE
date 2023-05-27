import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Option2 = () => {
   const [data, setData] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [selectedRecord, setSelectedRecord] = useState(null);
   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      address: '',
      phone: '',
      email: '',
    });
   const handleDelete = (record) => {
      setSelectedRecord(record);
      setIsDeleteModalVisible(true);
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
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

   const handleConfirmDelete = async () => {
      await axios
         .delete(`${process.env.REACT_APP_BASE_URL}tourguides/delete/${selectedRecord.id}`)
         .then((response) => {
            setIsDeleteModalVisible(false);
            setSelectedRecord(null);
            toast.success(response.data.message);
            fetchData();
         })
         .catch((error) => {
            toast.error(error.response.data.message);
         });
   };

   const handleCancelDelete = () => {
      setIsDeleteModalVisible(false);
      setSelectedRecord(null);
   };

   const handleOk = async () => {
      if (formData.name === '' || formData.address === '' || formData.phone === '' || formData.email === '') {
        toast.error('Vui lòng điền đầy đủ thông tin khuyến mãi');
        return;
      }
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}tourguides/save`, formData)
        .then((response) => {
          setIsModalVisible(false);
          toast.success(response.data.message);
          fetchData();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    
   return (
      <>
         <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
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
               <p>Bạn có chắc chắn muốn xoá hướng dẫn viên du lịch tên <b> "{selectedRecord?.name}"</b> không?</p>
            </Modal>
         )}
      </>
   );
};

export default Option2;
