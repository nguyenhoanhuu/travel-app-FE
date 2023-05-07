// material-ui
import { Typography } from '@mui/material';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import { useState } from 'react';
import { useEffect } from 'react';
import * as GetTour from '~/service/GetTour';
import * as deleteTour from '~/service/delete';
import { Modal, Space, Table } from 'antd';
import { Image } from 'antd';
import { Button } from 'antd';
import { format } from 'date-fns';
import FormAddTour from './FormAddTour';
import { Rate } from 'antd';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //
function ComponentTypography() {
   const [listTour, setListTour] = useState();
   const [isShowFormAdd, setIsShowFormAdd] = useState(false);
   const [reloadDb, setReloadDb] = useState(false);
   const [isShowDetailTour, setIsShowDetailTour] = useState(false);
   const [listDetailTour, setListDetailTour] = useState();
   const handleDeleteItem = async (id) => {
      await deleteTour
         .deleteWithId('tours/delete', id)
         .then((data) => {
            console.log(data);
            setReloadDb(!reloadDb);
         })
         .catch((error) => console.log(error));
   };

   const handleSetListDetailTour = async (id, callback) => {
      await GetTour.search('tours', id)
         .then((data) => {
            setListDetailTour(data);
            callback && callback(true);
         })
         .catch((error) => console.log(error));
   };
   const handleShowFormUpdate = (id) => {
      handleSetListDetailTour(id);
      setIsShowFormAdd(true);
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
         title: 'Chi tiết tour',
         dataIndex: 'detailTour',
         key: 'detailTour',
         render: (_, record) => (
            <Space size="middle">
               <Button
                  style={{ color: '#1677ff' }}
                  onClick={() => handleSetListDetailTour(record.id, setIsShowDetailTour)}
               >
                  hiển thị chi tiết tour
               </Button>
            </Space>
         ),
      },
      {
         title: 'Thao tác',
         key: 'action',
         fixed: 'right',
         render: (_, record) => (
            <Space size="middle">
               <Button style={{ color: '#1677ff' }} onClick={() => handleShowFormUpdate(record.id)}>
                  Chỉnh sửa
               </Button>
               <Button style={{ color: '#1677ff' }} onClick={() => handleDeleteItem(record.id)}>
                  Xóa
               </Button>
            </Space>
         ),
      },
   ];
   const handleOk = () => {
      setTimeout(() => {
         setIsShowDetailTour(false);
      }, 3000);
   };

   const handleCancel = () => {
      setIsShowDetailTour(false);
   };
   const listBooking = async (value) => {
      await GetTour.searchParamUrl('tours', 'pageNo=1&pageSize=100&sortBy=id')
         .then((data) => {
            setListTour(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      listBooking(0);
   }, [reloadDb]);
   return (
      <ComponentSkeleton>
         <Button
            type="primary"
            onClick={() => {
               setListDetailTour();
               setIsShowFormAdd(!isShowFormAdd);
            }}
         >
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

         {listDetailTour && (
            <Modal
               open={isShowDetailTour}
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
               {listDetailTour.itineraryDetail.map((item, index) => {
                  return (
                     <div>
                        <div>
                           <h4>tiêu đề</h4>
                           <Typography style={{ fontSize: '1.3rem' }}>{item.title}</Typography>
                        </div>
                        <div>
                           <h4>mô tả</h4>
                           <Typography style={{ fontSize: '1.3rem' }}>{item.description}</Typography>
                        </div>
                     </div>
                  );
               })}

               <h2 style={{ textAlign: 'center' }}>Thông tin thêm</h2>
               <div>
                  <div>
                     <h4>Mô tả</h4>
                     <Typography style={{ fontSize: '1.3rem' }}>
                        {listDetailTour.tourDetail && listDetailTour.tourDetail.description}
                     </Typography>
                  </div>
                  <div>
                     <h4>
                        Phương tiện di chuyển:{' '}
                        <Typography style={{ fontSize: '1.3rem' }}>
                           {listDetailTour.tourDetail && listDetailTour.tourDetail.transport}
                        </Typography>
                     </h4>
                  </div>
                  <div>
                     <h4>khách sạn:</h4>
                     <Rate value={listDetailTour.tourDetail && listDetailTour.tourDetail.starHotel} disabled></Rate>
                  </div>
               </div>
            </Modal>
         )}
         {isShowFormAdd && (
            <FormAddTour
               initData={listDetailTour}
               isshowFormAdd={isShowFormAdd}
               setIsShowFormAdd={setIsShowFormAdd}
               setReloadDb={setReloadDb}
               reloadDb={reloadDb}
            ></FormAddTour>
         )}
      </ComponentSkeleton>
   );
}

export default ComponentTypography;
