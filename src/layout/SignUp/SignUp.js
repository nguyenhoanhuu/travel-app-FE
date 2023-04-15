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

import classNames from 'classnames/bind';
import styles from '~/layout/SignUp/SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import * as post from '~/service/Post';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';

const cx = classNames.bind(styles);
function Copyright(props) {
   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="https://mui.com/">
            Your Website
         </Link>
         {new Date().getFullYear()}
      </Typography>
   );
}

const theme = createTheme();

export default function SignUp() {
   const navigate = useNavigate();
   const [fullName, SetFullName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [isValid, setIsValid] = useState([true, true, true, true, true]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [opt, setOtp] = useState();

   const handleOk = () => {
      setIsModalOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };
   const checkValidation = (validationString, callback, value, index) => {
      const isValidLst = [...isValid];
      if (index === 4) {
         if (value === password) {
            isValidLst[index] = true;
         } else {
            isValidLst[index] = false;
         }
      } else {
         const reg = new RegExp(validationString);
         isValidLst[index] = reg.test(value);
      }

      setIsValid(isValidLst);
      console.log(isValid);
      callback(value);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      // const data = new FormData(event.currentTarget);
      console.log({
         account: {
            username: fullName.trim(),
            password: password.trim(),
            accountType: 'customer',
         },
         name: fullName.trim(),
         phone: phoneNumber.trim(),
         email: email.trim(),
      });
      const checkValid = isValid.some((item) => {
         return item === false;
      });
      if (
         fullName.trim() !== '' &&
         phoneNumber.trim() !== '' &&
         email.trim() !== '' &&
         password.trim() !== '' &&
         !checkValid
      ) {
         await post
            .postWithBody('customer/register', {
               account: {
                  username: fullName.trim(),
                  password: password.trim(),
                  accountType: 'customer',
               },
               name: fullName.trim(),
               phone: phoneNumber.trim(),
               email: email.trim(),
            })
            .then((data) => {
               console.log(data);
               navigate('/login');
            });
      }
   };
   return (
      <div className={cx('sign-up-form')}>
         <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
               <input
                  type="text"
                  placeholder={'Enter your OTP'}
                  onChange={(e) => {
                     setOtp(e.target.value);
                  }}
               />
               <br />
               <br />
               {/* <button onClick={ValidateOtp}>Verify</button> */}
            </div>
         </Modal>
         <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                     <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign up
                  </Typography>
                  <Box
                     component="form"
                     validate={'Vui lòng nhập đầy đủ thông tin '}
                     onSubmit={handleSubmit}
                     sx={{ mt: 3 }}
                  >
                     <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                           <TextField
                              autoComplete="given-name"
                              name="fullName"
                              required
                              fullWidth
                              id="fullName"
                              label="Họ và Tên"
                              autoFocus
                              error={!isValid[0]}
                              helperText={!isValid[0] && 'Vui lòng nhập đúng thông tin theo định dạng'}
                              onChange={(e) => checkValidation('[a-zA-Z0-9]{8,}', SetFullName, e.target.value, 0)}
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField
                              required
                              fullWidth
                              id="phoneNumber"
                              label="Số Điện Thoại"
                              name="phoneNumber"
                              autoComplete="family-name"
                              error={!isValid[1]}
                              helperText={!isValid[1] && 'Vui lòng nhập đúng thông tin theo định dạng'}
                              onChange={(e) => checkValidation(/^09\d{8}$/, setPhoneNumber, e.target.value, 1)}
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              name="email"
                              autoComplete="email"
                              error={!isValid[2]}
                              helperText={!isValid[2] && 'Vui lòng nhập đúng thông tin theo định dạng'}
                              onChange={(e) =>
                                 checkValidation(
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    setEmail,
                                    e.target.value,
                                    2,
                                 )
                              }
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              required={true}
                              fullWidth
                              name="password"
                              label="Mật Khẩu"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              error={!isValid[3]}
                              helperText={!isValid[3] && 'Vui lòng nhập đúng thông tin theo định dạng'}
                              onChange={(e) => checkValidation(/^.{8,16}$/, setPassword, e.target.value, 3)}
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <TextField
                              required={true}
                              fullWidth
                              name="confirm_password"
                              label="Xác Nhân Mật Khẩu"
                              type="password"
                              id="confirm_password"
                              // autoComplete="new-password"
                              error={!isValid[4]}
                              helperText={!isValid[4] && 'Vui lòng nhập đúng thông tin theo định dạng'}
                              onChange={(e) => checkValidation('', setConfirmPassword, e.target.value, 4)}
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <FormControlLabel
                              control={<Checkbox value="allowExtraEmails" color="primary" />}
                              label="I want to receive inspiration, marketing promotions and updates via email."
                           />
                        </Grid>
                     </Grid>
                     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                     </Button>
                     <Grid container justifyContent="flex-end">
                        <Grid item>
                           <Link className={cx('link')} to="/login" variant="body2">
                              Already have an account? Sign in
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
                  <Copyright sx={{ mt: 5 }} />
               </Box>
            </Container>
         </ThemeProvider>
      </div>
   );
}
