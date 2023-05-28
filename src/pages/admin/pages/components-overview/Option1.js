import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Typography } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormAddTour from './FormAddTour';
const Option1 = () => {
   const [data, setData] = useState([]);
   const [selectedRecord, setSelectedRecord] = useState(null);
   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
   const [itinerary, setItinerary] = useState();
   const [showItinerary, setShowItinerary] = useState();

   const [isShowFormAdd, setIsShowFormAdd] = useState(false);
   const [reloadDb, setReloadDb] = useState(false);
   const [listDetailTour, setListDetailTour] = useState();
   const [text, setText] = useState('');

   const handleTextChange = (e) => {
      setText(e.target.value);
   };

   const handleDelete = (record) => {
      setSelectedRecord(record);
      setIsDeleteModalVisible(true);
   };
   const handleAddTour = (listour) => {
      setIsShowFormAdd(true);
      setListDetailTour(listour);
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
            setText('');
         })
         .catch((error) => {
            console.log(error);
         });
   };
   const handleShowItinerary = (data) => {
      setShowItinerary(true);
      setItinerary(data);
   };
   const renderDate = (date) => {
      return moment(date).format('DD/MM/YYYY');
   };
   const handleOk = () => {
      setTimeout(() => {
         setShowItinerary(false);
      }, 3000);
   };

   const handleCancel = () => {
      setShowItinerary(false);
   };
   console.log(showItinerary);
   console.log(itinerary);
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
         title: 'Giá tiền',
         dataIndex: 'price',
         key: 'price',
         width: '50px',
         render: (price) => {
            const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            return formattedPrice;
         },
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
               <Button type="primary" onClick={() => handleShowItinerary(record.itinerarys)} style={{ marginRight: 5 }}>
                  <EyeOutlined />
               </Button>
               {record.status !== 'Từ chối' && (
                  <>
                     {record.status === 'Xác nhận' ? (
                        <Button type="primary" onClick={() => handleAddTour(record)} style={{ marginRight: 5 }}>
                           <PlusOutlined />
                        </Button>
                     ) : (
                        <>
                           <Button type="primary" onClick={() => handleUpdate(record)}>
                              <CheckSquareOutlined />
                           </Button>
                           <Button type="danger" onClick={() => handleDelete(record)}>
                              <CloseSquareOutlined />
                           </Button>
                        </>
                     )}
                  </>
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
      if (text.trim() === '') {
         // Không cho phép lưu nếu không nhập đủ dữ liệu
         return toast.error('Vui lòng nhập lý do từ chối yêu cầu đặt tour');
      }
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
            setText('');
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
      <div>
         <ToastContainer />

         <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
         {showItinerary && (
            <Modal
               open={showItinerary}
               onOk={handleOk}
               onCancel={handleCancel}
               width={window.innerWidth <= 908 ? '100%' : '70%'}
               // {window.innerWidth < 908}

               footer={[
                  <Button key="back" onClick={handleCancel}>
                     Thoát
                  </Button>,
               ]}
            >
               <h2 style={{ textAlign: 'center' }}>Chi tiết lịch trình</h2>
               {itinerary &&
                  itinerary.map((item, index) => {
                     return (
                        <div>
                           <div>
                              <h4>Tiêu đề</h4>
                              <Typography style={{ fontSize: '1.3rem' }}>{item.title}</Typography>
                           </div>
                           <div>
                              <h4>Mô tả</h4>
                              <Typography style={{ fontSize: '1.3rem' }}>{item.description}</Typography>
                           </div>
                        </div>
                     );
                  })}
            </Modal>
         )}
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
                        message: 'Vui lòng nhập tên lý do từ chối',
                     },
                  ]}
               />
            </Modal>
         )}
         {isShowFormAdd && (
            <FormAddTour
               initData={listDetailTour}
               isShowFormAdd={isShowFormAdd}
               setIsShowFormAdd={setIsShowFormAdd}
               setReloadDb={setReloadDb}
               reloadDb={reloadDb}
               isRequestTour={true}
            ></FormAddTour>
         )}
      </div>
   );
};

export default Option1;
