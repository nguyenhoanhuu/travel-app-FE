import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import NumberFormat from 'react-number-format';

const headCells = [
   {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: 'ID',
   },
   {
      id: 'nameCustomer',
      align: 'left',
      disablePadding: true,
      label: 'Tên khách hàng',
   },
   {
      id: 'numberOfAdbult',
      align: 'left',
      disablePadding: false,
      label: 'Số lượng người',
   },
   {
      id: 'createAt',
      align: 'left',
      disablePadding: false,
      label: 'Thời gian đặt Tour',
   },
   {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: 'Trạng thái',
   },
   {
      id: 'total',
      align: 'right',
      disablePadding: false,
      label: 'Tổng tiền (VNĐ)',
   },
];

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
         return order;
      }
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

function OrderList() {
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_BASE_URL}bookings/top10BookingRecently`)
         .then((response) => response.json())
         .then((data) => setOrders(data));
   }, []);

   const [order, setOrder] = useState('desc');
   const [orderBy, setOrderBy] = useState('id');

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   return (
      <Box sx={{ mt: 3 }}>
         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     {headCells.map((headCell) => (
                        <TableCell
                           key={headCell.id}
                           align={headCell.align}
                           padding={headCell.disablePadding ? 'none' : 'normal'}
                           sortDirection={orderBy === headCell.id ? order : false}
                        >
                           {headCell.label}
                        </TableCell>
                     ))}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {stableSort(orders, getComparator(order, orderBy)).map((row) => (
                     <TableRow key={row.id}>
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.nameCustomer}</TableCell>
                        <TableCell align="left">{row.numberOfAdbult}</TableCell>
                        <TableCell align="left">
                           {new Date(row.createAt).toLocaleString('vi-VN', {
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                           })}
                        </TableCell>
                        <TableCell align="left">
                           {row.status === 'Chờ thanh toán' && (
                              <span
                                 style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: 'red',
                                    marginRight: '5px',
                                 }}
                              ></span>
                           )}
                           {row.status === 'Thành công' && (
                              <span
                                 style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: 'green',
                                    marginRight: '5px',
                                 }}
                              ></span>
                           )}
                           {row.status === 'Chưa chọn hình thức thanh toán' && (
                              <span
                                 style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: 'purple',
                                    marginRight: '5px',
                                 }}
                              ></span>
                           )}
                           {row.status}
                        </TableCell>
                        <TableCell align="right">
                           <NumberFormat value={row.total} displayType="text" thousandSeparator />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
}

export default OrderList;
