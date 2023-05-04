import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Option1 = () => {
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
   const [text, setText] = useState('');

   const handleTextChange = (e) => {
      setText(e.target.value);
   };

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
   const renderDate = (date) => {
      return moment(date).format('DD/MM/YYYY');
   };
   const columns = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: 'id',
         width: '10px',
      },
      {
         title: 'Điểm đi ',
         dataIndex: 'departure',
         key: 'departure',
         width: '10px',
      },
      {
         title: 'Điểm đến',
         dataIndex: 'destination',
         key: 'destination',
         width: '10px',
      },
      {
         title: 'Loại',
         dataIndex: 'type',
         key: 'type',
         width: '40px',
         render: (type) => (
            <span style={{ color: type === 'Truong Nuoc' ? '#008000' : '#FF0000' }}>
               {type === 'Truong Nuoc' ? 'Trong nước' : 'Ngoài nước'}
            </span>
         ),
      },
      {
         title: 'Số lượng người',
         dataIndex: 'numberOfPeople',
         key: 'numberOfPeople',
         width: '50px',
      },
      {
         title: 'Ngày đi',
         dataIndex: 'startDate',
         key: 'startDate',
         render: (date) => renderDate(date),
      },
      {
         title: 'Ngày về',
         dataIndex: 'endDate',
         key: 'endDate',
         render: (date) => renderDate(date),
      },

      {
         title: 'Ngày tạo',
         dataIndex: 'createAt',
         key: 'createAt',
         render: (date) => renderDate(date),
      },
      {
         title: 'Tên khách hàng',
         dataIndex: 'customerName',
         key: 'customerName',
      },
      {
         title: 'Trạng thái',
         dataIndex: 'status',
         key: 'status',
         render: (text) => <span style={{ color: text === 'Chờ xác nhận' ? '#32CD32' : '#00BFFF' }}>{text}</span>,
      },
      {
         title: 'Ngày chấp nhận',
         dataIndex: 'updateAt',
         key: 'updateAt',
         render: (date) => renderDate(date),
      },

      {
         title: 'Hành động',
         key: 'action',
         render: (text, record) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               {record.status !== 'Xác nhận' && (
                  <Button type="primary" onClick={() => handleUpdate(record)} hidden={record.status === 'Xác nhận'}>
                     Xác nhận
                  </Button>
               )}
               {record.status !== 'Xác nhận' && (
                  <Button type="danger" onClick={() => handleDelete(record)} hidden={record.status === 'Xác nhận'}>
                     Từ chối
                  </Button>
               )}
            </div>
         ),
      },
   ];

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/requesttravel');
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
      setText('');
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
         <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
         {isDeleteModalVisible && (
            <Modal
               title="Xác nhận"
               visible={isDeleteModalVisible}
               onOk={handleConfirmDelete}
               onCancel={handleCancelDelete}
               okText="Xác nhận"
               cancelText="Huỷ bỏ"
            >
               <p>
                  Bạn có chắc chắn muốn từ chối yêu cầu <b> ID : {selectedRecord?.id}</b> không?
               </p>

               <Input.TextArea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Vui lòng nhập lý do từ chối"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập tên khuyến mãi',
                     },
                  ]}
               />
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

export default Option1;
