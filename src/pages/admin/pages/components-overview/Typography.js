// material-ui
import { Breadcrumbs, Divider, Grid, Link, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import { useState } from 'react';
import { useEffect } from 'react';
import * as GetTour from '~/service/GetTour';
import { Col, Modal, Row, Space, Table } from 'antd';
import { Image } from 'antd';
import { Button } from 'antd';
import { format } from 'date-fns';
import FormAddTour from './FormAddTour';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //
function ComponentTypography() {
   const [listTour, setListTour] = useState();
   const [isVisible, setIsVisible] = useState();
   const [isShowFormAdd, setIsShowFormAdd] = useState(false);

   const [isShowDetail, setIsShowDetail] = useState(false);
   const [isShowDetailTour, setIsShowDetailTour] = useState(false);
   const [listDetail, setListDetail] = useState();
   const [listDetailTour, setListDetailTour] = useState();
   const handleSetListDetail = async (id) => {
      await GetTour.search('itinerarys/tourId', id)
         .then((data) => {
            setListDetail(data);
            setIsShowDetail(true);
         })
         .catch((error) => console.log(error));
   };
   const handleSetListDetailTour = async (id) => {
      await GetTour.search('tourdetails/tourId', id)
         .then((data) => {
            setListDetailTour(data);
            setIsShowDetailTour(true);
         })
         .catch((error) => console.log(error));
   };
   const columns = [
      {
         title: 'Mã tour',
         dataIndex: 'id',
         key: 'id',
         width: '4%',
         fixed: 'left',
      },
      {
         title: 'Tên tour',
         dataIndex: 'name',
         key: 'name',
         width: '11%',
      },
      {
         title: 'Hình ảnh',
         dataIndex: 'images',
         key: 'images',
         width: '13%',
         // render: (text, record) => <img src={text} alt={record.name} />,
         render: (images) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               {images.map((image) => {
                  return <Image src={image} width={'24%'} />;
               })}
            </div>
         ),
      },
      {
         title: 'Giờ xuất phát',
         dataIndex: 'departureTime',
         key: 'departureTime',
      },
      {
         title: 'Điểm khởi hành',
         dataIndex: 'departure',
         key: 'departure',
      },
      {
         title: 'Điểm đến',
         dataIndex: 'destination',
         key: 'destination',
      },
      {
         title: 'Ngày bắt đầu',
         dataIndex: 'startDay',
         key: 'startDay',
         render: (day) => {
            return format(new Date(day), 'dd/MM/yyyy');
         },
      },
      {
         title: 'Ngày kết thúc',
         dataIndex: 'endDay',
         key: 'endDay',
         render: (day) => {
            return format(new Date(day), 'dd/MM/yyyy');
         },
      },
      {
         title: 'Số ngày',
         dataIndex: 'numberOfDay',
         key: 'numberOfDay',
      },
      {
         title: 'số lượng khách',
         dataIndex: 'numberOfPeople',
         key: 'numberOfPeople',
      },
      {
         title: 'Loại',
         dataIndex: 'type',
         key: 'type',
      },
      {
         title: 'Giá',
         dataIndex: 'price',
         key: 'price',
      },
      {
         title: 'Người tạo',
         dataIndex: 'createdBy',
         key: 'createdBy',
      },
      {
         title: 'Tên lịch trình',
         dataIndex: 'itineraryName',
         key: 'itineraryName',
      },
      {
         title: 'Chi tiết tour',
         dataIndex: 'detailTour',
         key: 'detailTour',
         render: (_, record) => (
            <Space size="middle">
               <a style={{ color: '#1677ff' }} onClick={() => handleSetListDetailTour(record.id)}>
                  hiển thị chi tiết tour
               </a>
            </Space>
         ),
      },
      {
         title: 'Chi tiết lịch trình ',
         dataIndex: 'detailItinerary',
         key: 'detailItinerary',
         render: (_, record) => (
            <Space size="middle">
               <a style={{ color: '#1677ff' }} onClick={() => handleSetListDetail(record.id)}>
                  hiện thị chi tiết lịch trình{' '}
               </a>
            </Space>
         ),
      },
      {
         title: 'Thao tác',
         key: 'action',
         fixed: 'right',
         render: (_, record) => (
            <Space size="middle">
               <a style={{ color: '#1677ff' }}>Update</a>
               <a style={{ color: '#1677ff' }}>Delete</a>
            </Space>
         ),
      },
   ];
   const handleOk = () => {
      setTimeout(() => {
         setIsShowDetailTour(false);
         setIsShowDetail(false);
      }, 3000);
   };

   const handleCancel = () => {
      setIsShowDetailTour(false);
      setIsShowDetail(false);
   };
   const listBooking = async (value) => {
      await GetTour.searchParamUrl('tours', 'pageNo=1&pageSize=10&sortBy=id')
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      listBooking(0);
   }, []);
   return (
      <ComponentSkeleton>
         <Button type="primary" onClick={() => setIsShowFormAdd(!isShowFormAdd)}>
            thêm tour
         </Button>

         <Table
            size="small"
            columns={columns}
            dataSource={listTour}
            scroll={{
               x: 3000,
               y: 400,
            }}
            style={{ fontSize: 10 }}
         />
         {listDetail && (
            <Modal
               open={isShowDetail}
               // title="Xác nhận các thông tin đặt tour"
               onOk={handleOk}
               onCancel={handleCancel}
               width={window.innerWidth <= 908 ? '100%' : '70%'}
               // {window.innerWidth < 908}
               footer={[
                  <Button key="back" onClick={handleCancel}>
                     Return
                  </Button>,
               ]}
            >
               <h2 style={{ textAlign: 'center' }}>Chi tiết lịch trình</h2>
               {listDetail.map((item, index) => {
                  return (
                     <div>
                        <div>
                           <h4>tiêu đề</h4>
                           <Typography style={{ fontSize: '1rem' }}>{item.title}</Typography>
                        </div>
                        <div>
                           <h4>mô tả</h4>
                           <Typography style={{ fontSize: '1rem' }}>{item.description}</Typography>
                        </div>
                     </div>
                  );
               })}
            </Modal>
         )}
         {listDetailTour && (
            <Modal
               open={isShowDetailTour}
               onOk={handleOk}
               onCancel={handleCancel}
               width={window.innerWidth <= 908 ? '100%' : '70%'}
               // {window.innerWidth < 908}
               footer={[
                  <Button key="back" onClick={handleCancel}>
                     Return
                  </Button>,
               ]}
            >
               <h2 style={{ textAlign: 'center' }}>Thông tin thêm</h2>
               <div>
                  <div>
                     <h4>Mô tả</h4>
                     <Typography style={{ fontSize: '1.2rem' }}>{listDetailTour.description}</Typography>
                  </div>
                  <div>
                     <h4>
                        Phương tiện di chuyển:{' '}
                        <Typography style={{ fontSize: '1.2rem' }}>{listDetailTour.transport}</Typography>
                     </h4>
                  </div>
                  <div>
                     <h4>
                        khách sạn:<Typography style={{ fontSize: '1.2rem' }}>{listDetailTour.starhotel}⭐</Typography>
                     </h4>
                  </div>
               </div>
            </Modal>
         )}
         {isShowFormAdd && (
            <FormAddTour isshowFormAdd={isShowFormAdd} setIsShowFormAdd={setIsShowFormAdd}></FormAddTour>
         )}
      </ComponentSkeleton>
   );
}

export default ComponentTypography;
