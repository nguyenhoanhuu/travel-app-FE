import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import {
   CommentOutlined,
   LockOutlined,
   QuestionCircleOutlined,
   UserOutlined,
   UnorderedListOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import * as GetTour from '~/service/GetTour';
import { useNavigate } from 'react-router-dom';
// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = ({ isModal, setIsShowModal, setDataInModal, setType, isCustomer }) => {
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
      await GetTour.searchParamUrl('bookings/billPaymentSuccess', '', header)
         .then((data) => {
            setDataInModal(data.bookings);
            setType('success');
            setIsShowModal(true);

            // navigate(`/detailBooking/${idTour}`, { state: { data: data } });
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
   const handleListItemClickRedirect = () => {
      window.open('https://www.facebook.com/profile.php?id=100092037799063', '_blank');
    };
   return (
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
          <ListItemButton selected={selectedIndex === 0} onClick={handleListItemClickRedirect}>
      <ListItemIcon>
        <QuestionCircleOutlined />
      </ListItemIcon>
      <ListItemText primary="Hỗ trợ" />
    </ListItemButton>


         <ListItemButton
            selected={selectedIndex === 3}
            //  onClick={(event) => handleListItemClick(event, 3)}
         >
            <ListItemIcon>
               <CommentOutlined />
            </ListItemIcon>
            <ListItemText primary="Phản hồi" />
         </ListItemButton>
         {isCustomer && (
            <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
               <ListItemIcon>
                  <UnorderedListOutlined />
               </ListItemIcon>
               <ListItemText primary="Lịch sử đơn hàng" />
            </ListItemButton>
         )}
      </List>
   );
};

export default SettingTab;
