import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { message } from 'antd';
import * as GetTour from '~/service/GetTour';
import { useNavigate } from 'react-router-dom';
// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout, isModal, setIsShowModal, setDataInModal, setType, isCustomer }) => {
   const key = 'updatable';
   const [messageApi, contextHolder] = message.useMessage();
   const theme = useTheme();
   const navigate = useNavigate();
   const [selectedIndex, setSelectedIndex] = useState(0);

   const getListBill = async () => {
      const header = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
         },
      };
      await GetTour.searchParamUrl('bookings/billWaitForPayment', '', header)
         .then((data) => {
            setDataInModal(data.bookings);
            setType('wait');
            setIsShowModal(true);
         })
         .catch((error) => {
            setDataInModal(error);
            messageApi.open({
               type: 'error',
               key,
               type: 'Tìm thất bại',
               content: error.message,
               duration: 2,
            });
         });
   };
   const handleListItemClick = async (event, index) => {
      setSelectedIndex(index);
      await getListBill();
   };

   return (
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
         <ListItemButton selected={selectedIndex === 0}>
            <ListItemIcon>
               <EditOutlined />
            </ListItemIcon>
            <ListItemText primary="Chỉnh sửa thông tin cá nhân" />
         </ListItemButton>
         <ListItemButton selected={selectedIndex === 1}>
            <ListItemIcon>
               <UserOutlined />
            </ListItemIcon>
            <ListItemText primary="Xem thông tin cá nhân" />
         </ListItemButton>
         {isCustomer && (
            <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
               <ListItemIcon>
                  <WalletOutlined />
               </ListItemIcon>
               <ListItemText primary="Hoá đơn chờ thanh toán" />
            </ListItemButton>
         )}
         <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
            <ListItemIcon>
               <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" onClick={() => handleLogout()} />
         </ListItemButton>
      </List>
   );
};

ProfileTab.propTypes = {
   handleLogout: PropTypes.func,
};

export default ProfileTab;
