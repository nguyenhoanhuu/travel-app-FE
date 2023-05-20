import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '~/layout/Login/Login.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as post from '~/service/Post';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);
function Copyright(props) {
   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="http://localhost:3000/">
            Happy Trip
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const theme = createTheme();

export default function Login() {
   let { state } = useLocation();
   const navigate = useNavigate();
   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      await post
         .postWithBody('authenticate', { login: data.get('SDT'), password: data.get('password') })
         .then((data) => {
            // document.cookie = `token =${data.accessToken}; path=/admin`;
            window.localStorage.setItem('token', data.accessToken);
            window.localStorage.setItem('role', data.role);
            window.localStorage.setItem('id', data.id);

            if (data.role === 'employee') {
               window.location.href = '/admin';
            } else {
               navigate(state.history);
            }
         })
         .catch((error) => {
            console.log(error);
            toast('Sai thông tin tài khoản hoặc mật khẩu đăng nhập!');
         });
   };

   return (
      <div className={cx('sign-in-form')}>
         <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
               <ToastContainer
                  position="top-right"
                  autoClose={4000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  // theme="dark"
               />
               <CssBaseline />
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     padding: '30px',
                     backgroundColor: '#fff',
                     borderRadius: '20px',
                     textAlign: 'left',
                  }}
               >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                     {/* <LockOutlinedIcon /> */}
                     <FontAwesomeIcon icon={faLockOpen}></FontAwesomeIcon>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Đăng nhập
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="SDT"
                        label="Số Điện Thoại"
                        name="SDT"
                        autoComplete="SDT"
                        autoFocus
                     />
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật Khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lưu mật khẩu" />
                     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Đăng nhập
                     </Button>
                     <Grid container>
                        <Grid item xs>
                           <Link className={cx('link')} to="#" variant="body2">
                              Quên mật khẩu ?
                           </Link>
                        </Grid>
                        <Grid item>
                           <Link className={cx('link')} to="/signup" variant="body2" state={state}>
                              {'Đăng kí tài khoản tại đây!'}
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
                  <Copyright sx={{ mt: 8, mb: 4 }} />
               </Box>
            </Container>
         </ThemeProvider>
      </div>
   );
}
