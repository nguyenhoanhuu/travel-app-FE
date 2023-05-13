import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
   Avatar,
   Box,
   ButtonBase,
   CardContent,
   ClickAwayListener,
   Grid,
   IconButton,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Paper,
   Popper,
   Stack,
   Tab,
   Tabs,
   Typography,
} from '@mui/material';

// project import
import MainCard from '~/pages/admin/components/MainCard';
import Transitions from '~/pages/admin/components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

// assets
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import * as Get from '~/service/GetTour';
import ModalInforBill from './../../../../../../../component/ModalInforBill/ModalInforBill';
// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`profile-tabpanel-${index}`}
         aria-labelledby={`profile-tab-${index}`}
         {...other}
      >
         {value === index && children}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `profile-tab-${index}`,
      'aria-controls': `profile-tabpanel-${index}`,
   };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = ({ state }) => {
   const theme = useTheme();
   const [user, setUser] = useState('');
   const idUser = window.localStorage.getItem('id');
   const roleUser = window.localStorage.getItem('role');
   const [isCustomer, setIsCustomer] = useState(false);

   const getDataUser = async (role, id) => {
      let pathString = '';
      if (role === 'employee') {
         pathString = '/employees';
      } else {
         setIsCustomer(true);
         pathString = '/customer';
      }
      await Get.search(pathString, id)
         .then((data) => {
            setUser(data);
         })
         .catch((error) => console.log(error));
   };
   useEffect(() => {
      if (idUser != null) {
         getDataUser(roleUser, idUser);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [roleUser]);
   const handleLogout = async () => {
      // document.cookie = 'token =';
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      window.location.href = '/';
   };

   const anchorRef = useRef(null);
   const [open, setOpen] = useState(false);
   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
   };

   const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
         return;
      }
      setOpen(false);
   };

   const [value, setValue] = useState(0);
   const [isModal, setIsShowModal] = useState(false);
   const [dataInModal, setDataInModal] = useState();
   const [type, setType] = useState();

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const iconBackColorOpen = 'grey.300';
   return (
      <Box sx={{ flexShrink: 0, ml: 0.75, zIndex: 999 }}>
         {dataInModal && (
            <ModalInforBill
               isModal={isModal}
               setIsShowModal={setIsShowModal}
               dataInModal={dataInModal}
               type={type}
            ></ModalInforBill>
         )}
         <ButtonBase
            sx={{
               p: 0.25,
               bgcolor: open ? iconBackColorOpen : 'transparent',
               borderRadius: 1,
               '&:hover': { bgcolor: 'secondary.lighter' },
            }}
            aria-label="open profile"
            ref={anchorRef}
            aria-controls={open ? 'profile-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
         >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
               <Avatar
                  alt="profile user"
                  src={
                     'https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307t-user-account-image-log-user.png'
                  }
                  sx={{ width: 32, height: 32 }}
               />
               {/* <Typography variant="subtitle1">John Doe</Typography> */}
            </Stack>
         </ButtonBase>
         <Popper
            placement="bottom-end"
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
               modifiers: [
                  {
                     name: 'offset',
                     options: {
                        offset: [0, 9],
                     },
                  },
               ],
            }}
         >
            {({ TransitionProps }) => (
               <Transitions type="fade" in={open} {...TransitionProps}>
                  {open && (
                     <Paper
                        sx={
                           user
                              ? {
                                   // boxShadow: theme.customShadows.z1,
                                   width: 290,
                                   minWidth: 240,
                                   maxWidth: 290,
                                   [theme.breakpoints.down('md')]: {
                                      maxWidth: 250,
                                   },
                                }
                              : {
                                   width: 'auto',
                                }
                        }
                     >
                        {user ? (
                           <ClickAwayListener onClickAway={handleClose}>
                              <MainCard elevation={0} border={false} content={false}>
                                 <CardContent sx={{ px: 2.5, pt: 3 }}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                       <Grid item>
                                          <Stack direction="row" spacing={1.25} alignItems="center">
                                             <Avatar
                                                alt="profile user"
                                                src={
                                                   'https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307t-user-account-image-log-user.png'
                                                }
                                                sx={{ width: 42, height: 42 }}
                                             />
                                             <Stack>
                                                {roleUser === 'employee' ? (
                                                   <>
                                                      <Typography variant="h4">{user.name}</Typography>
                                                      <Typography variant="h5" color="textSecondary">
                                                         {user.email}
                                                      </Typography>
                                                   </>
                                                ) : (
                                                   <>
                                                      {' '}
                                                      <Typography variant="h6">{user.name}</Typography>
                                                      <Typography variant="body2" color="textSecondary">
                                                         {user.email}
                                                      </Typography>
                                                   </>
                                                )}
                                             </Stack>
                                          </Stack>
                                       </Grid>
                                       <Grid item>
                                          <IconButton size="large" color="secondary" onClick={handleLogout}>
                                             <LogoutOutlined />
                                          </IconButton>
                                       </Grid>
                                    </Grid>
                                 </CardContent>
                                 {open && (
                                    <>
                                       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                          <Tabs
                                             variant="fullWidth"
                                             value={value}
                                             onChange={handleChange}
                                             aria-label="profile tabs"
                                          >
                                             <Tab
                                                sx={{
                                                   display: 'flex',
                                                   flexDirection: 'row',
                                                   justifyContent: 'center',
                                                   alignItems: 'center',
                                                   textTransform: 'capitalize',
                                                }}
                                                icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                label="Thông tin cá nhân"
                                                {...a11yProps(0)}
                                             />
                                             <Tab
                                                sx={{
                                                   display: 'flex',
                                                   flexDirection: 'row',
                                                   justifyContent: 'center',
                                                   alignItems: 'center',
                                                   textTransform: 'capitalize',
                                                }}
                                                icon={
                                                   <SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />
                                                }
                                                label="Cài đặt"
                                                {...a11yProps(1)}
                                             />
                                          </Tabs>
                                       </Box>
                                       <TabPanel value={value} index={0} dir={theme.direction}>
                                          <ProfileTab
                                             handleLogout={handleLogout}
                                             isModal={isModal}
                                             setIsShowModal={setIsShowModal}
                                             setDataInModal={setDataInModal}
                                             setType={setType}
                                             isCustomer={isCustomer}
                                          />
                                       </TabPanel>
                                       <TabPanel value={value} index={1} dir={theme.direction}>
                                          <SettingTab
                                             isModal={isModal}
                                             setIsShowModal={setIsShowModal}
                                             setDataInModal={setDataInModal}
                                             setType={setType}
                                             isCustomer={isCustomer}
                                          />
                                       </TabPanel>
                                    </>
                                 )}
                              </MainCard>
                           </ClickAwayListener>
                        ) : (
                           <>
                              <Link to="/login" state={state}>
                                 <ListItemButton>
                                    <ListItemIcon>
                                       <UserOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="Đăng nhập" />
                                 </ListItemButton>
                              </Link>
                              <Link to="/signup" state={state}>
                                 <ListItemButton>
                                    <ListItemIcon>
                                       <UserOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="Đăng ký" />
                                 </ListItemButton>
                              </Link>
                           </>
                        )}
                     </Paper>
                  )}
               </Transitions>
            )}
         </Popper>
      </Box>
   );
};

export default Profile;
