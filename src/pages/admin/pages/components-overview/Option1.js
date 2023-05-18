import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { CheckSquareOutlined,CloseSquareOutlined} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
const Option1 = () => {
   const [data, setData] = useState([]);
   const [selectedRecord, setSelectedRecord] = useState(null);
   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
   const [text, setText] = useState('');

   const handleTextChange = (e) => {
      setText(e.target.value);
   };

   const handleDelete = (record) => {
      setSelectedRecord(record);
      setIsDeleteModalVisible(true);
   };

   const handleUpdate = (record) => {
      const customerName = record.customerName;
      const reasonReject = text;
      const id = record.id;

      const params = qs.stringify({
         id: id,
         customerName: customerName,
         reasonReject: reasonReject,
      });
      const url = `${process.env.REACT_APP_BASE_URL}requesttravel/statusRequestTour?${params}`;
      axios
         .get(url)
         .then((response) => {
            setIsDeleteModalVisible(false);
            fetchData();
            setText("")
         })
         .catch((error) => {
            console.log(error);
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
         render: (date) => {
           if (date === null) {
             return '';
           }
           return renderDate(date);
         },
       },

      {
         title: 'Hành động',
         key: 'action',
         render: (text, record) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               {record.status !== 'Xác nhận' && record.status !== 'Từ chối' && (
                  <Button type="primary" onClick={() => handleUpdate(record)} hidden={record.status === 'Xác nhận'}>
                  <CheckSquareOutlined />
                  </Button>
               )}
               {record.status !== 'Xác nhận' && record.status !== 'Từ chối' && (
                  <Button type="danger" onClick={() => handleDelete(record)} hidden={record.status === 'Xác nhận'}>
                  <CloseSquareOutlined />
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
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}requesttravel`);
      setData(result.data);
   };

   const handleConfirmDelete = async () => {
      const customerName = selectedRecord.customerName;
      const reasonReject = text;
      const id = selectedRecord.id;

      const params = qs.stringify({
         id: id,
         customerName: customerName,
         reasonReject: reasonReject,
      });
      const url = `${process.env.REACT_APP_BASE_URL}requesttravel/statusRequestTour?${params}`;
      axios
         .get(url)
         .then((response) => {
            setIsDeleteModalVisible(false);
            fetchData();
            setText("");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const handleCancelDelete = () => {
      setIsDeleteModalVisible(false);
      setText('');
      setSelectedRecord(null);
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
      </>
   );
};

export default Option1;
