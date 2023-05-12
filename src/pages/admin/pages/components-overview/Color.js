import { Space, Table, Button, Popconfirm } from 'antd';
import ComponentSkeleton from './ComponentSkeleton';
import { useEffect, useState } from 'react';
import * as GetTour from '~/service/GetTour';
import * as Post from '~/service/Post';
import { QuestionCircleOutlined } from '@ant-design/icons';

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
         title: 'mã Booking',
         dataIndex: 'id',
         key: 'id',
         fixed: 'left',
      },
      {
         title: 'Ngày bắt đầu',
         dataIndex: 'startDayTour',
         key: 'startDayTour',
      },
      {
         title: 'Ngày kết thúc',
         dataIndex: 'endDayTour',
         key: 'endDayTour',
      },
      {
         title: 'Giờ khời hành ',
         dataIndex: 'departureTime',
         key: 'departureTime',
      },
      {
         title: 'Tên khách hàng ',
         dataIndex: 'nameCustomer',
         key: 'nameCustomer',
      },
      {
         title: 'Mã tour',
         dataIndex: 'tourId',
         key: 'tourId',
      },
      {
         title: 'Tên tour',
         dataIndex: 'nameTour',
         key: 'nameTour',
      },
      {
         title: 'Giá tour',
         dataIndex: 'priceTour',
         key: 'priceTour',
      },
      {
         title: 'Giá voucher',
         dataIndex: 'priceVoucher',
         key: 'priceVoucher',
      },
      {
         title: 'Mã voucher',
         dataIndex: 'voucherCode',
         key: 'voucherCode',
      },
      {
         title: 'Số lượng người lớn ',
         dataIndex: 'numberOfAdbult',
         key: 'numberOfAdbult',
      },
      {
         title: 'Số lượng trẻ em ',
         dataIndex: 'numberOfChildren',
         key: 'numberOfChildren',
      },
      {
         title: 'Người tạo  ',
         dataIndex: 'createAt',
         key: 'createAt',
      },
      {
         title: 'Tổng tiền ',
         dataIndex: 'total',
         key: 'total',
      },
      {
         title: 'ghi chú ',
         dataIndex: 'note',
         key: 'note',
      },
      {
         title: 'Trạng thái ',
         dataIndex: 'status',
         key: 'status',
      },
      {
         title: 'Thao tác',
         key: 'action',
         fixed: 'right',
         render: (_, record) => (
            <Space size="middle">
               <Popconfirm
                  title="cập nhật thông tin tình trạng"
                  description="trạng thái booking sẽ xác nhận thành công?"
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
                  <Button style={{ color: '#1677ff' }}>chỉnh sửa trạng thái</Button>
               </Popconfirm>
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
