import { Modal, Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
function ModalInforBill({ isModal, setIsShowModal, dataInModal, type }) {
   console.log(dataInModal);
   const handleOk = () => {
      setTimeout(() => {
         setIsShowModal(false);
      }, 3000);
   };

   const handleCancel = () => {
      setIsShowModal(false);
   };
   const navigate = useNavigate();
   const handlePayment = (id) => {
      setIsShowModal(false);
      navigate(`/payment/${id}`);
   };
   const handleViewDetailTour = (id, data) => {
      setIsShowModal(false);
      navigate(`/detailBooking/${id}`, { state: { data: { booking: data } } });
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
         align: 'center',
         width: type === 'wait' ? '8%' : '5%',
         render: (_, record) => (
            <Space size="middle">
               {type === 'wait' ? (
                  <>
                     <Button style={{ color: '#1677ff' }} onClick={() => handleViewDetailTour(record.id, record)}>
                        xem chi tiết
                     </Button>
                     <Button style={{ color: '#1677ff' }} onClick={() => handlePayment(record.id)}>
                        Thanh Toán
                     </Button>
                  </>
               ) : (
                  <Button style={{ color: '#1677ff' }} onClick={() => handleViewDetailTour(record.id, record)}>
                     xem chi tiết
                  </Button>
               )}
            </Space>
         ),
      },
   ];

   return (
      <Modal
         open={isModal}
         onOk={handleOk}
         onCancel={handleCancel}
         width={window.innerWidth <= 908 ? '100%' : '100%'}
         footer={[
            <Button key="back" onClick={handleCancel}>
               Thoát
            </Button>,
         ]}
      >
         <h2>{type === 'wait' ? 'Thông tin các hóa đơn chưa thanh toán' : 'thông tin các hóa đơn'}</h2>
         <Table
            size="large"
            columns={columns}
            dataSource={dataInModal}
            scroll={{
               x: 3000,
               y: 400,
            }}
            style={{ fontSize: 10 }}
         />
      </Modal>
   );
}

export default ModalInforBill;
