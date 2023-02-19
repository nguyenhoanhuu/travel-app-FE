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

const data = [
   {
      key: '1',
      customerOfType: 'Người lớn (Từ 12 tuổi trở lên)',
      tourPrice: 9990000,
      landTour: 6990000,
   },
   {
      key: '2',
      customerOfType: 'Trẻ em (Từ 2 tuổi đến dưới 12 tuổi)',
      tourPrice: 82482500,
      landTour: 5242500,
   },
   {
      key: '3',
      customerOfType: 'Em bé (Dưới 2 tuổi)',
      tourPrice: 5495000,
      landTour: 0,
   },
   {
      key: '4',
      customerOfType: 'Phụ thu phòng đơn',
      tourPrice: 6000000,
      landTour: 6000000,
   },
];
const CostTable = () => <Table size="large" pagination={false} columns={columns} dataSource={data} />;
export default CostTable;
