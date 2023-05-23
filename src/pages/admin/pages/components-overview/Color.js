import { Space, Table, Button, Popconfirm } from 'antd';
import ComponentSkeleton from './ComponentSkeleton';
import { useEffect, useState } from 'react';
import * as GetTour from '~/service/GetTour';
import * as Post from '~/service/Post';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

function ComponentColor() {
   const [reloadDb, setReloadDb] = useState(false);
   const [bookings, setBookings] = useState();
   // const [showComfirm, setShowComfirm] = useState(false);
   const handleUpdateTour = async (value, token) => {
      await Post.postWithBodyAndToken(`${process.env.REACT_APP_BASE_URL}bookings/update`, value, token)
         .then((data) => {
            console.log(data);
            setReloadDb(!reloadDb);
         })
         .catch((error) => console.log(error));
   };
   const columns = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: 'id',
         fixed: 'left',
         width: 70,
      },
      {
         title: 'Ngày bắt đầu',
         dataIndex: 'startDayTour',
         key: 'startDayTour',
         align: 'center',
         width: 130,
      },
      {
         title: 'Ngày kết thúc',
         dataIndex: 'endDayTour',
         key: 'endDayTour',
         align: 'center',
         width: 130,
      },
      {
         title: 'Giờ khởi hành ',
         dataIndex: 'departureTime',
         key: 'departureTime',
         align: 'center',
         width: 100,
      },
      {
         title: 'Tên khách hàng ',
         dataIndex: 'nameCustomer',
         key: 'nameCustomer',
         align: 'center',
         width: 200,
      },
      {
         title: 'Tên tour',
         dataIndex: 'nameTour',
         key: 'nameTour',
         width: 240,
      },
      {
         title: 'Số lượng người lớn ',
         dataIndex: 'numberOfAdbult',
         key: 'numberOfAdbult',
         align: 'center',
         width: 120,
      },
      {
         title: 'Số lượng trẻ em ',
         dataIndex: 'numberOfChildren',
         key: 'numberOfChildren',
         align: 'center',
         width: 120,
      },
      {
         title: 'Ngày tạo  ',
         dataIndex: 'createAt',
         key: 'createAt',
         align: 'center',
         width: 120,
         render: (day) => {
            return format(new Date(day), 'dd/MM/yyyy');
         },
      },
      {
         title: 'Tổng tiền ',
         dataIndex: 'total',
         key: 'total',
         align: 'center',
         width: 120,
      },
      {
         title: 'ghi chú ',
         dataIndex: 'note',
         key: 'note',
         width: 300,
      },
      {
         title: 'Trạng thái ',
         dataIndex: 'status',
         key: 'status',
         width: 200,
      },
      {
         title: 'Thao tác',
         key: 'action',
         fixed: 'right',
         align: 'center',
         width: 200,
         render: (_, record) => (
            <Space size="middle">
               {record.status !== 'Thành công' && (
                  <Popconfirm
                     title="Cập nhật thông tin tình trạng"
                     description="Trạng thái booking sẽ xác nhận thành công?"
                     okText="Xác nhận"
                     cancelText="Thoát"
                     placement="left"
                     onConfirm={() =>
                        handleUpdateTour({ id: record.id, status: 'Thành công' }, window.localStorage.getItem('token'))
                     }
                     icon={
                        <QuestionCircleOutlined
                           style={{
                              color: 'red',
                           }}
                        />
                     }
                  >
                     <Button style={{ color: '#1677ff' }}>Cập nhập trạng thái</Button>
                  </Popconfirm>
               )}
            </Space>
         ),
      },
   ];
   const listBooking = async (value) => {
      await GetTour.searchParamUrl('bookings/findAll', 'voucherIdExists=0')
         .then((data) => {
            setBookings(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      listBooking(0);
   }, [reloadDb]);
   return (
      <ComponentSkeleton>
         <Table
            size="small"
            columns={columns}
            dataSource={bookings}
            scroll={{
               x: 3000,
               y: 400,
            }}
            style={{ fontSize: 10 }}
         />
      </ComponentSkeleton>
   );
}

export default ComponentColor;
