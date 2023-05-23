import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const Option3 = () => {
   const [data, setData] = useState([]);
   const [employeeId, setEmployeeId] = useState(null);
   const columns = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Tên khách hàng',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Địa chỉ',
         dataIndex: 'address',
         key: 'address',
      },
      {
         title: 'Số điện thoại',
         dataIndex: 'phone',
         key: 'phone',
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
      },
   ];

   useEffect(() => {
      const storedEmployeeId = localStorage.getItem('id');
      if (storedEmployeeId) {
         setEmployeeId(storedEmployeeId);
      }
   }, []);

   useEffect(() => {
      fetchData();
   }, [employeeId]);

   const fetchData = async () => {
      if (employeeId) {
         try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/list?employeeId=${employeeId}`);
            setData(result.data.customers);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      }
   };

   return <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />;
};

export default Option3;
