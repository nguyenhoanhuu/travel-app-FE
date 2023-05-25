import { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import {
   Box,
   Button,
   Grid,
   Stack,
   Typography,
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import MainCard from '~/pages/admin/components/MainCard';
import AnalyticEcommerce from '~/pages/admin/components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
   const [slot, setSlot] = useState('week');
   const [dataCountBooking, setDataCountBooking] = useState([]);
   const [dataSumBill, setDataSumBill] = useState([]);
   const [weeklyTotalBill, setDataWeeklyTotalBill] = useState([]);
   const [countCustomer, setCountCustomer] = useState(0);
   const [countUserRequestTravel, setCountUserRequestTravel] = useState(0);
   const fetchDataCountBooking = async () => {
      try {
         const result = await axios.get(`${process.env.REACT_APP_BASE_URL}bookings/countBooking`);
         setDataCountBooking(result.data);
      } catch (error) {
         console.error(error);
      }
   };

   const fetchDataSumTotalBill = async () => {
      try {
         const resultSumTotalBill = await axios.get(`${process.env.REACT_APP_BASE_URL}bookings/sumBooking`);
         console.log(resultSumTotalBill);
         setDataSumBill(resultSumTotalBill.data);
      } catch (error) {
         console.error(error);
      }
   };
   const fetchDataWeeklyTotalBill = async () => {
      try {
         const resultWeeklyTotalBill = await axios.get(`${process.env.REACT_APP_BASE_URL}bookings/weeklyTotalBill`);
         setDataWeeklyTotalBill(resultWeeklyTotalBill.data);
      } catch (error) {
         console.error(error);
      }
   };
   const fetchDataCountListCustomer = async () => {
      try {
         const resultCountListCustomer = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/count`);
         setCountCustomer(resultCountListCustomer.data);
      } catch (error) {
         console.error(error);
      }
   };
   const fetchDataCountUserRequestTravel = async () => {
      try {
         const resultCountUserRequestTravel = await axios.get(`${process.env.REACT_APP_BASE_URL}requesttravel/count`);
         setCountUserRequestTravel(resultCountUserRequestTravel.data);
      } catch (error) {
         console.error(error);
      }
   };


   useEffect(() => {
      fetchDataCountBooking();
      fetchDataSumTotalBill();
      fetchDataWeeklyTotalBill();
      fetchDataCountListCustomer();
      fetchDataCountUserRequestTravel();
   }, []);

   function formatCurrency(value) {
      const formatter = new Intl.NumberFormat('vi-VN', {
         style: 'currency',
         currency: 'VND',
      });
      return formatter.format(value);
   }
   const formattedPercentage = formatCurrency(dataSumBill.totalSumBookings);
   const formattedWeeklyTotalBill = formatCurrency(weeklyTotalBill);
   console.log(weeklyTotalBill);
   return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
         {/* row 1 */}
         <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Trang chủ</Typography>
         </Grid>
         <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
               title="Tổng số lượng yêu cầu tạo Tour"
               count={countUserRequestTravel}
               // percentage={59.3}
               extra="35,000"
            />
         </Grid>
         <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce title="Số lượng khách hàng" count={countCustomer}  extra="8,900" />
         </Grid>
         <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
               title="Tổng số lượng đơn hàng tháng hiện tại"
               count={dataCountBooking.totalBokingsSuccess}
               percentage={dataCountBooking.percent}
               isLoss
               color="warning"
               extra="1,943"
            />
         </Grid>
         <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
               title="Tổng doanh thu tháng hiện tại"
               count={formattedPercentage}
               percentage={dataSumBill.percentSum}
               isLoss
               color="warning"
               // extra="$20,395"
            />
         </Grid>

         <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

         {/* row 2 */}
         <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
               <Grid item>
                  <Typography variant="h5">Thống kê doanh thu</Typography>
               </Grid>
               <Grid item>
                  <Stack direction="row" alignItems="center" spacing={0}>
                     <Button
                        size="small"
                        onClick={() => setSlot('month')}
                        color={slot === 'month' ? 'primary' : 'secondary'}
                        variant={slot === 'month' ? 'outlined' : 'text'}
                     >
                        Tháng
                     </Button>
                  </Stack>
               </Grid>
            </Grid>
            <MainCard content={false} sx={{ mt: 1.5 }}>
               <Box sx={{ pt: 1, pr: 2 }}>
                  <IncomeAreaChart slot={slot} />
               </Box>
            </MainCard>
         </Grid>
         <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
               <Grid item>
                  <Typography variant="h5">Doanh thu một tuần</Typography>
               </Grid>
               <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
               <Box sx={{ p: 3, pb: 0 }}>
                  <Stack spacing={2}>
                     <Typography variant="h6" color="textSecondary">
                        Tổng số tiền
                     </Typography>
                     <Typography variant="h3">{formattedWeeklyTotalBill}</Typography>
                  </Stack>
               </Box>
               <MonthlyBarChart />
            </MainCard>
         </Grid>

         {/* row 3 */}
         <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
               <Grid item>
                  <Typography variant="h5">Đơn đặt Tour gần đây</Typography>
               </Grid>
               <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
               <OrdersTable />
            </MainCard>
         </Grid>
      </Grid>
   );
};

export default DashboardDefault;
