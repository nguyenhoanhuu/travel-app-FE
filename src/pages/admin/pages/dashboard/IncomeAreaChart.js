import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

// chart options
const areaChartOptions = {
   chart: {
      height: 450,
      type: 'area',
      toolbar: {
         show: false,
      },
   },
   dataLabels: {
      enabled: false,
   },
   stroke: {
      curve: 'smooth',
      width: 2,
   },
   grid: {
      strokeDashArray: 0,
   },
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const line = theme.palette.divider;

   const [options, setOptions] = useState(areaChartOptions);
   const [series, setSeries] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}bookings/monthlyRevenue`);
            const data = response.data;

            // Khởi tạo mảng dữ liệu cho Page Views và Sessions, mặc định là 0
            const pageViewsData = Array(12).fill(0);
            const sessionsData = Array(12).fill(0);

            // Cập nhật dữ liệu từ API
            data.forEach((item) => {
               const month = item.month - 1; // Trừ 1 vì mảng bắt đầu từ 0
               pageViewsData[month] = item.totalBill;
               sessionsData[month] = item.profit;
            });

            // Cập nhật series
            setSeries([
               {
                  name: 'Doanh thu',
                  data: pageViewsData,
               },
               {
                  name: 'Lợi nhuận',
                  data: sessionsData,
               },
            ]);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);

   useEffect(() => {
      setOptions((prevState) => ({
         ...prevState,
         colors: [theme.palette.primary.main, theme.palette.primary[700]],
         xaxis: {
            categories:
               slot === 'month'
                  ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
               style: {
                  colors: Array(12).fill(secondary),
               },
            },
            axisBorder: {
               show: true,
               color: line,
            },
            tickAmount: slot === 'month' ? 11 : 7,
         },
         yaxis: {
            labels: {
               style: {
                  colors: [secondary],
               },
            },
         },
         grid: {
            borderColor: line,
         },
         tooltip: {
            theme: 'light',
         },
      }));
   }, [primary, secondary, line, theme, slot]);

   return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
   slot: PropTypes.string,
};
<IncomeAreaChart slot="month" />;
export default IncomeAreaChart;
