import { Table } from 'antd';

import classNames from 'classnames/bind';
import styles from '~/component/CostTable/CostTable.module.scss';

// const cx = classNames.bind(styles);

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
   {
      title: 'Land tour',
      dataIndex: 'landTour',
      key: 'landTour',
   },
];

function CostTable({ price }) {
   const data = [
      {
         key: '1',
         customerOfType: 'Người lớn (Từ 12 tuổi trở lên)',
         tourPrice: price.toLocaleString() + 'đ',
         landTour: (price * 0.7).toLocaleString() + 'đ',
      },
      {
         key: '2',
         customerOfType: 'Trẻ em (Từ 2 tuổi đến dưới 12 tuổi)',
         tourPrice: (price * 0.9).toLocaleString() + 'đ',
         landTour: (price * 0.6).toLocaleString() + 'đ',
      },
      {
         key: '3',
         customerOfType: 'Em bé (Dưới 2 tuổi)',
         tourPrice: (price * 0.6).toLocaleString() + 'đ',
         landTour: 0,
      },
      {
         key: '4',
         customerOfType: 'Phụ thu phòng đơn',
         tourPrice: (price * 0.1).toLocaleString() + 'đ',
         landTour: (price * 0.1).toLocaleString() + 'đ',
      },
   ];
   return <Table size="large" pagination={false} columns={columns} dataSource={data} />;
}

export default CostTable;
