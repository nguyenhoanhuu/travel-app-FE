import { Table } from 'antd';

import '~/component/CostTable/CostTable.module.scss';

const columns = [
   {
      title: 'Loại khách',
      dataIndex: 'customerOfType',
      key: 'customerOfType',
      render: (text) => <h5>{text}</h5>,
   },
   {
      title: 'Giá tour',
      dataIndex: 'tourPrice',
      key: 'tourPrice',
   },
   // {
   //    title: 'Land tour',
   //    dataIndex: 'landTour',
   //    key: 'landTour',
   // },
];

function CostTable({ adultPrice, childPrice, babyPrice }) {
   const data = [
      {
         key: '1',
         customerOfType: 'Người lớn (Từ 12 tuổi trở lên)',
         tourPrice: adultPrice.toLocaleString() + ' đ',
         // landTour: (adultPrice * 0.9).toLocaleString() + 'đ',
      },
      {
         key: '2',
         customerOfType: 'Trẻ em (Từ 2 tuổi đến dưới 12 tuổi)',
         tourPrice: childPrice.toLocaleString() + ' đ',
         // landTour: (childPrice * 0.9).toLocaleString() + 'đ',
      },
      {
         key: '3',
         customerOfType: 'Em bé (Dưới 2 tuổi)',
         tourPrice: babyPrice.toLocaleString() + ' đ',
         // landTour: 0,
      },
      {
         key: '4',
         customerOfType: 'Phụ thu phòng đơn',
         tourPrice: (adultPrice * 0.1).toLocaleString() + ' đ',
         // landTour: (adultPrice * 0.1).toLocaleString() + 'đ',
      },
   ];
   return <Table size="large" pagination={false} columns={columns} dataSource={data} />;
}

export default CostTable;
