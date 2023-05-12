import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
   chart: {
      type: 'bar',
      height: 365,
      toolbar: {
         show: false,
      },
   },
   plotOptions: {
      bar: {
         columnWidth: '45%',
         borderRadius: 4,
      },
   },
   dataLabels: {
      enabled: false,
   },
   xaxis: {
      categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
      axisBorder: {
         show: false,
      },
      axisTicks: {
         show: false,
      },
   },
   yaxis: {
      show: false,
   },
   grid: {
      show: false,
   },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const info = theme.palette.info.light;

   const [series, setSeries] = useState([
      {
         data: [0, 0, 0, 0, 0, 0, 0],
      },
   ]);

   const [options, setOptions] = useState(barChartOptions);

   useEffect(() => {
      // Fetch data from API
      const fetchData = async () => {
         try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}bookings/weekly`);
            const data = await response.json();

            // Update series data with API response
            setSeries([
               {
                  data: [
                     data.MONDAY,
                     data.TUESDAY,
                     data.WEDNESDAY,
                     data.THURSDAY,
                     data.FRIDAY,
                     data.SATURDAY,
                     data.SUNDAY,
                  ],
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
         colors: [info],
         xaxis: {
            labels: {
               style: {
                  colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
               },
            },
         },
         tooltip: {
            theme: 'light',
         },
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [primary, info, secondary]);

   return (
      <div id="chart">
         <ReactApexChart options={options} series={series} type="bar" height={365} />
      </div>
   );
};

export default MonthlyBarChart;
